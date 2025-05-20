import * as React from 'react';
import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {Award, Calendar, Clock, DatabaseBackup, Filter, HardDrive, RefreshCw, Tag} from 'lucide-react';
import {CronExpressionOptions, CronExpressionParser} from 'cron-parser';

// --- Type Definitions ---

interface Backup {
    id: string;
    date: Date;
    size: number; // Size in MB
    tags: string[];
    isAutomatic: boolean;
    status: 'completed'; // Assuming status is always 'completed' based on usage
    keep: boolean;
}

interface Policy {
    maxTotalFiles: number;
    maxTotalGiB: number;
    minDaily: number;
    maxDaily: number; // 0 means unlimited
    minWeekly: number;
    maxWeekly: number; // 0 means unlimited
    minMonthly: number;
    maxMonthly: number; // 0 means unlimited
}

interface FileSizeRange {
    min: number; // Min size in MB
    max: number; // Max size in MB
}

interface Stats {
    totalBackups: number;
    keptBackups: number;
    deletedBackups: number;
    totalSizeMB: number;
    totalSizeGB: string; // Formatted string
    dailyCount: number;
    weeklyCount: number;
    monthlyCount: number;
    protectedCount: number;
}

type FilterStatus = 'all' | 'kept' | 'deleted';

type FilterType = 'all' | 'automatic' | 'manual';

// --- Helper Functions ---

const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    });
};

const getWeekNumber = (date: Date): number => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return (
        1 +
        Math.round(
            ((d.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
            7
        )
    );
};

const getMonthYear = (date: Date): string => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
};

const generateBackupName = (date: Date): string => {
    const d = new Date(date);

    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hour = String(d.getUTCHours()).padStart(2, '0');
    const minute = String(d.getUTCMinutes()).padStart(2, '0');
    const second = String(d.getUTCSeconds()).padStart(2, '0');

    return `backup-db-${year}-${month}-${day}-${hour}${minute}${second}.zip`;
};

const generateFileSize = (minMB: number = 100, maxMB: number = 150): number => {
    // Ensure min is less than max
    const effectiveMin = Math.min(minMB, maxMB);
    const effectiveMax = Math.max(minMB, maxMB);
    return Math.floor(Math.random() * (effectiveMax - effectiveMin + 1)) + effectiveMin;
};

const generateBackups = (
    cronExpression: string,
    startDate: Date,
    endDate: Date,
    fileSizeRange: FileSizeRange
): Backup[] => {
    const backups: Backup[] = [];
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Start at the beginning of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // End at the very end of the day

    const seenWeeks = new Set<string>();
    const seenMonths = new Set<string>();

    try {
        const options: CronExpressionOptions = {
            currentDate: start,
            startDate: start,
            endDate: end,
            strict: true,
            tz: 'UTC',
        };
        const interval = CronExpressionParser.parse("0 " + cronExpression, options); // add a fixed 0 for the seconds field (needed with strict mode)
        let iterations = 0;

        for (const date of interval) {
            if (iterations++ > 10000) { // prevent infinite loops
                break
            }

            const d = date.toDate();
            const weekNumber = getWeekNumber(d);
            const monthYear = getMonthYear(d);
            const weekKey = `${d.getFullYear()}-W${weekNumber}`;

            const tags: string[] = ['daily'];

            if (!seenWeeks.has(weekKey)) {
                tags.push('weekly');
                seenWeeks.add(weekKey);
            }
            if (!seenMonths.has(monthYear)) {
                tags.push('monthly');
                seenMonths.add(monthYear);
            }

            backups.push({
                id: generateBackupName(d),
                date: d,
                size: generateFileSize(fileSizeRange.min, fileSizeRange.max),
                tags,
                isAutomatic: true,
                status: 'completed',
                keep: true, // Initial state, retention policy will modify
            });
        }
    } catch (err: any) {
        throw new Error(`Cron parser failed: ${err.message}`);
    }
    return backups;
};


const addManualBackups = (
    existingBackups: Backup[],
    startDate: Date,
    endDate: Date,
    count: number = 5,
    fileSizeRange: FileSizeRange
): Backup[] => {
    const userTags = [
        'important', 'pre-deploy', 'milestone', 'release', 'testing', 'bugfix',
    ];
    const manualBackups: Backup[] = [];

    if (existingBackups.length === 0) {
        // Cannot generate manual backups without a date range
        return manualBackups;
    }

    const dateRange = endDate.getTime() - startDate.getTime();

    // Ensure dateRange is non-negative
    if (dateRange < 0) return manualBackups;

    for (let i = 0; i < count; i++) {
        const randomOffset = dateRange > 0 ? Math.random() * dateRange : 0;
        const backupDate = new Date(startDate.getTime() + randomOffset);

        const numTags = Math.floor(Math.random() * 2) + 1; // 1 or 2 tags
        const selectedTags: string[] = [];
        const availableTags = [...userTags]; // Copy to allow removal

        for (let j = 0; j < numTags && availableTags.length > 0; j++) {
            const randomIndex = Math.floor(Math.random() * availableTags.length);
            selectedTags.push(availableTags.splice(randomIndex, 1)[0]); // Add and remove
        }

        if (Math.random() > 0.5) {
            selectedTags.push('protected');
        }

        manualBackups.push({
            id: generateBackupName(backupDate),
            date: backupDate,
            size: generateFileSize(fileSizeRange.min, fileSizeRange.max),
            tags: selectedTags,
            isAutomatic: false,
            status: 'completed',
            keep: selectedTags.includes('protected'), // Protected are always kept
        });
    }

    return manualBackups;
};

const applyRetentionPolicy = (backups: Backup[], policy: Policy): Backup[] => {
    // Create a mutable copy to work with
    const workingBackups: Backup[] = backups.map(b => ({...b, date: new Date(b.date)})); // Shallow copy with new Date objects

    // Sort backups by date (newest first)
    workingBackups.sort((a, b) => b.date.getTime() - a.date.getTime());

    const filesToKeep = new Map<string, Backup>();
    const filesToDelete = new Map<string, Backup>();

    let currentTotalSizeBytes = 0;
    let currentTotalKeptFiles = 0;

    // 1. iteration - files to keep based on minimums

    let dailyKept = 0, weeklyKept = 0, monthlyKept = 0;

    const {minDaily, minWeekly, minMonthly} = policy;
    for (const backup of workingBackups) {
        if (dailyKept >= minDaily && weeklyKept >= minWeekly && monthlyKept >= minMonthly) {
            break
        }

        // Protected backups are always kept and do not count into minimums
        if (backup.tags.includes('protected')) {
            filesToKeep.set(backup.id, backup);
            continue;
        }

        if (backup.tags.includes('monthly')) {
            if (minMonthly > 0 && monthlyKept < minMonthly) {
                filesToKeep.set(backup.id, backup);
                monthlyKept++;
            }
            continue // If it's a monthly backup, don't count it as weekly or daily
        }

        if (backup.tags.includes('weekly')) {
            if (minWeekly > 0 && weeklyKept < minWeekly) {
                filesToKeep.set(backup.id, backup);
                weeklyKept++;
            }
            continue // If it's a weekly backup, don't count it as daily
        }

        if (backup.tags.includes('daily')) {
            if (minDaily > 0 && dailyKept < minDaily) {
                filesToKeep.set(backup.id, backup);
                dailyKept++;
            }
            // continue
        }
    }


    // 2. iteration - files to delete based on a maximum

    const {maxDaily, maxWeekly, maxMonthly} = policy;
    for (const backup of workingBackups) {
        // Skip already kept (by minimums or protected)
        if (filesToKeep.has(backup.id)) {
            currentTotalSizeBytes += backup.size
            currentTotalKeptFiles++
            continue;
        }

        // Protected backups are always kept - this adds all remaining protected backups to filesToKeep
        if (backup.tags.includes('protected')) {
            filesToKeep.set(backup.id, backup);
            currentTotalSizeBytes += backup.size
            currentTotalKeptFiles++
            continue;
        }

        if (backup.tags.includes('monthly')) {
            if (maxMonthly > 0 && monthlyKept > maxMonthly) {
                filesToDelete.set(backup.id, backup);
            } else {
                monthlyKept++;
            }
            continue;
        }

        if (backup.tags.includes('weekly')) {
            if (maxWeekly > 0 && weeklyKept > maxWeekly) {
                filesToDelete.set(backup.id, backup);
            } else {
                weeklyKept++;
            }
            continue;
        }

        if (backup.tags.includes('daily')) {
            if (maxDaily > 0 && dailyKept > maxDaily) {
                filesToDelete.set(backup.id, backup);
            } else {
                dailyKept++;
            }
            // continue;
        }
    }

    // 3. iteration - files to delete based on size and max file count

    const policyMaxSizeBytes = policy.maxTotalGiB * 1024; // Convert GiB to MB
    for (const backup of workingBackups) {
        if (filesToKeep.has(backup.id) || filesToDelete.has(backup.id)) {
            continue;
        }

        if (currentTotalSizeBytes + backup.size > policyMaxSizeBytes) {
            filesToDelete.set(backup.id, backup);
            continue;
        }

        if (currentTotalKeptFiles >= policy.maxTotalFiles) {
            filesToDelete.set(backup.id, backup);
            continue;
        }

        currentTotalSizeBytes += backup.size;
        currentTotalKeptFiles++;
    }

    return workingBackups.map(backup => ({
        ...backup,
        keep: !filesToDelete.has(backup.id),
    }));
};

// ---

const BackupSimulator = () => {
    // Default values
    const defaultCron = '5 0 * * *'; // Five minutes after midnight
    const defaultPolicy: Policy = {
        maxTotalFiles: 50,
        maxTotalGiB: 5,
        minDaily: 7,
        maxDaily: 0, // 0 means unlimited
        minWeekly: 4,
        maxWeekly: 0, // 0 means unlimited
        minMonthly: 3,
        maxMonthly: 0, // 0 means unlimited
    };
    // const defaultPolicy: Policy = {
    //     maxTotalFiles: 50,
    //     maxTotalGiB: 5,
    //     minDaily: 7,
    //     maxDaily: 14, // 0 means unlimited
    //     minWeekly: 4,
    //     maxWeekly: 12, // 0 means unlimited
    //     minMonthly: 3,
    //     maxMonthly: 6, // 0 means unlimited
    // };

    // State
    const [cronExpression, setCronExpression] = useState<string>(defaultCron);
    const [startDate, setStartDate] = useState<Date>(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    });
    const [endDate, setEndDate] = useState<Date>(() => {
        return new Date();
    });
    const formatDateToInput = (date: Date | null | undefined): string => {
        if (!date || isNaN(date.getTime())) {
            return '';
        }
        return date.toISOString().slice(0, 10);
    };
    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        if (dateString) {
            const newDate = new Date(dateString);
            if (!isNaN(newDate.getTime())) {
                setStartDate(newDate);
                if (endDate < newDate) {
                    setEndDate(newDate);
                }
            }
        }
    };
    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        if (dateString) {
            const newDate = new Date(dateString);
            if (!isNaN(newDate.getTime())) {
                setEndDate(newDate);
            }
        }
    };
    const [policy, setPolicy] = useState<Policy>(defaultPolicy);
    const [backups, setBackups] = useState<Backup[]>([]);
    const [filteredBackups, setFilteredBackups] = useState<Backup[]>([]);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [filterTag, setFilterTag] = useState<string>('all'); // 'all' or a specific tag string
    const [filterType, setFilterType] = useState<string>('all'); // 'all', 'automatic' or 'manual'
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [fileSizeRange, setFileSizeRange] = useState<FileSizeRange>({min: 100, max: 150});
    const [maxInputString, setMaxInputString] = useState(fileSizeRange.max.toString());

    // Calculate statistics
    const stats = useMemo<Stats | null>(() => {
        if (!backups.length) return null;

        const kept = backups.filter(backup => backup.keep);
        const totalSize = kept.reduce((sum, backup) => sum + backup.size, 0);

        // Count tags precisely based on the definition (e.g., weekly should not count monthly)
        let monthlyKept: number = 0
        let weeklyKept: number = 0
        let dailyKept: number = 0
        let protectedKept: number = 0
        for (const b of kept) {
            if (b.tags.includes('protected')) {
                protectedKept++;
                continue; // a protected tag automatically excludes backup from minimums
            }
            if (b.tags.includes('monthly')) {
                monthlyKept++;
                continue;
            }
            if (b.tags.includes('weekly')) {
                weeklyKept++;
                continue;
            }
            if (b.tags.includes('daily')) {
                dailyKept++;
                // continue;
            }
        }

        return {
            totalBackups: backups.length,
            keptBackups: kept.length,
            deletedBackups: backups.length - kept.length, // Calculate deleted count
            totalSizeMB: totalSize,
            totalSizeGB: (totalSize / 1024).toFixed(2),
            dailyCount: dailyKept,
            weeklyCount: weeklyKept,
            monthlyCount: monthlyKept,
            protectedCount: protectedKept,
        };
    }, [backups]);

    // Generate backups function
    const generateSimulation = () => {
        try {
            setErrorMessage(''); // Clear previous errors

            const autoBackups = generateBackups(
                cronExpression,
                startDate,
                endDate,
                fileSizeRange
            );

            // Add manual backups (adjust count based on auto backups)
            const manualCount = Math.max(1, Math.min(15, Math.ceil(autoBackups.length * 0.1))); // e.g., 10% of auto, min 1, max 15
            const manualBackups = addManualBackups(
                autoBackups, // Pass auto backups to determine date range
                startDate,
                endDate,
                manualCount,
                fileSizeRange
            );

            const allBackups = [...autoBackups, ...manualBackups];

            // Apply retention policy
            const processedBackups = applyRetentionPolicy(allBackups, policy);

            // Sort final list for display (newest first)
            processedBackups.sort((a, b) => b.date.getTime() - a.date.getTime());

            setBackups(processedBackups);
            // setFilteredBackups(processedBackups); // Filter effect will handle this
            // Reset filters? Optional, maybe keep them
            // setFilterStatus('all');
            // setFilterTag('all');

        } catch (error: any) {
            console.error("Simulation Generation Error:", error);
            setErrorMessage(error.message || 'An unexpected error occurred during simulation.');
            setBackups([]); // Clear backups on error
            setFilteredBackups([]);
        }
    };

    // Generate initial backups on mount
    useEffect(() => {
        generateSimulation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    // Re-run simulation if relevant parameters change (optional - currently manual via button)
    // useEffect(() => {
    //     generateSimulation();
    // }, [cronExpression, startDate, endDate, policy, fileSizeRange]);

    // Filter backups when state changes
    useEffect(() => {
        let filtered = [...backups];

        if (filterStatus === 'kept') {
            filtered = filtered.filter(backup => backup.keep);
        } else if (filterStatus === 'deleted') {
            filtered = filtered.filter(backup => !backup.keep);
        }

        if (filterTag !== 'all') {
            filtered = filtered.filter(backup => backup.tags.includes(filterTag));
        }

        if (filterType === 'automatic') {
            filtered = filtered.filter(backup => backup.isAutomatic);
        } else if (filterType === 'manual') {
            filtered = filtered.filter(backup => !backup.isAutomatic);
        }

        setFilteredBackups(filtered);
    }, [backups, filterStatus, filterTag, filterType]);

    // Handle policy input change
    const handlePolicyChange = (field: keyof Policy, value: string) => {
        // Allow empty input temporarily, default to 0 if invalid
        const numValue = parseInt(value, 10);
        setPolicy(prev => ({
            ...prev,
            // Ensure non-negative values, treat NaN as 0
            [field]: isNaN(numValue) || numValue < 0 ? 0 : numValue,
        }));
    };

    // Handle File Size Range change
    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numValue = parseInt(e.target.value, 10);
        setFileSizeRange(prev => {
            const newRange = {...prev};
            // Ensure min >= 1 and max >= min + 1
            newRange.min = isNaN(numValue) || numValue < 1 ? 1 : numValue;
            // Adjust max if min exceeds it
            if (newRange.max <= newRange.min) {
                newRange.max = newRange.min + 1;
            }
            return newRange;
        });
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxInputString(e.target.value);
    };

    const handleMaxBlur = () => {
        const numValue = parseInt(maxInputString, 10);

        setFileSizeRange(prev => {
            const newRange = {...prev};
            const minLimit = prev.min + 1;

            // max must be a valid number and >= min + 1
            if (isNaN(numValue) || numValue < minLimit) {
                newRange.max = minLimit;
            } else {
                newRange.max = numValue;
            }

            // Update the local string state to match the final validated value in the main state.
            // This ensures the input displays the corrected value after blur.
            setMaxInputString(newRange.max.toString());

            return newRange;
        });
    };

    // Get tag color utility
    const getTagColor = (tag: string): string => {
        switch (tag) {
            // Blue (Daily)
            case 'daily':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            // Green (Weekly)
            case 'weekly':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            // Purple (Monthly)
            case 'monthly':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            // Red (Protected)
            case 'protected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            // Yellow (Important)
            case 'important':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            // Amber (Pre-deploy)
            case 'pre-deploy':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
            // Emerald (Milestone)
            case 'milestone':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
            // Cyan (Release)
            case 'release':
                return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
            // Indigo (Testing)
            case 'testing':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            // Fuchsia (Bugfix)
            case 'bugfix':
                return 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200';
            // Default (Gray)
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    // Get all unique tags from current backups
    const allTags = useMemo<string[]>(() => {
        if (!backups.length) return [];
        const tags = new Set<string>();
        backups.forEach(backup => {
            backup.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [backups]);

    return (
        <div className='w-full h-full p-0'>
            <h2 className='text-1xl md:text-2xl font-bold text-gray-700 dark:text-gray-100 mb-2 text-center md:text-left'>
                Backup Retention Simulator
            </h2>

            {/* Configuration Section */}
                <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1 pt-0'>
                    Configuration
                </h3>
            <div className='bg-gray-50 dark:bg-gray-800 p-2 rounded-lg mb-2 border border-gray-200 dark:border-gray-700'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='space-y-2'>
                        {/* Backup Schedule */}
                        <h4 className='text-md font-medium text-gray-600 dark:text-gray-300 flex items-center'>
                            <Calendar className='w-2 h-2 mr-2'/> Backup Schedule
                        </h4>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <label className='block text-sm text-gray-600 dark:text-gray-300 col-span-1 sm:col-span-2'>
                                Cron Expression
                                <input
                                    type='text'
                                    value={cronExpression}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCronExpression(e.target.value)}
                                    className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                                    placeholder='5 0 * * *'
                                />
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'>
                                Start Date
                                <input
                                    type='date'
                                    value={formatDateToInput(startDate)}
                                    onChange={handleStartDateChange}
                                    className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 dark:[color-scheme:dark]' // Added color-scheme for picker icon
                                />
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'>
                                End Date
                                <input
                                    type='date'
                                    value={formatDateToInput(endDate)}
                                    onChange={handleEndDateChange}
                                    className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 dark:[color-scheme:dark]' // Added color-scheme for picker icon
                                    min={formatDateToInput(startDate)} // Prevent end date before start date
                                />
                            </label>
                        </div>

                        {/* File Size Configuration */}
                        <div className='space-y-2 mt-10'>
                            <h4 className='text-md font-medium text-gray-600 dark:text-gray-300 flex items-center'>
                                <HardDrive className='w-2 h-2 mr-2'/>
                                File Size Configuration
                            </h4>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <label className='block text-sm text-gray-600 dark:text-gray-300'>
                                    Min Size (MB)
                                    <input
                                        type='number'
                                        value={fileSizeRange.min}
                                        onChange={handleMinChange}
                                        className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                        min='1'
                                    />
                                </label>
                                <label className='block text-sm text-gray-600 dark:text-gray-300'>
                                    Max Size (MB)
                                    <input
                                        type='number'
                                        value={maxInputString}
                                        onChange={handleMaxChange}
                                        onBlur={handleMaxBlur}
                                        className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                        min={fileSizeRange.min + 1} // Ensure max is always > min
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Storage Management */}
                    <div className='space-y-2'>
                        <h4 className='text-md font-medium text-gray-600 dark:text-gray-300 flex items-center'>
                            <Clock className='w-2 h-2 mr-2'/> Retention Policy
                        </h4>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1'>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Max Total Files
                                <input type='number'
                                       value={policy.maxTotalFiles}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('maxTotalFiles', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Max Total GiB
                                <input type='number'
                                       value={policy.maxTotalGiB}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('maxTotalGiB', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>

                            {/* Daily */}
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Min Daily
                                <input type='number'
                                       value={policy.minDaily}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('minDaily', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Max Daily <span className='text-xs text-gray-500 dark:text-gray-400'>(0=unlimited)</span>
                                <input type='number'
                                       value={policy.maxDaily}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('maxDaily', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>

                            {/* Weekly */}
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Min Weekly
                                <input type='number'
                                       value={policy.minWeekly}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('minWeekly', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Max Weekly <span className='text-xs text-gray-500 dark:text-gray-400'>(0=unlimited)</span>
                                <input type='number'
                                       value={policy.maxWeekly}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('maxWeekly', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>

                            {/* Monthly */}
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Min Monthly
                                <input type='number'
                                       value={policy.minMonthly}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('minMonthly', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>
                            <label className='block text-sm text-gray-600 dark:text-gray-300'> Max Monthly <span className='text-xs text-gray-500 dark:text-gray-400'>(0=unlimited)</span>
                                <input type='number'
                                       value={policy.maxMonthly}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => handlePolicyChange('maxMonthly', e.target.value)}
                                       className='mt-1 block w-full px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100'
                                       min='0'/>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Simulation Control */}
                <div className='mt-2 flex justify-end'>
                    <button
                        onClick={generateSimulation} // No event needed here
                        className='inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 focus:ring-blue-500 dark:focus:ring-blue-400'
                    >
                        <RefreshCw className='w-2 h-2 mr-2'/>
                        Generate Simulation
                    </button>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className='mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600/50 text-red-700 dark:text-red-300 rounded'>
                        Error: {errorMessage}
                    </div>
                )}
            </div>


            {/* Results Section */}
            {stats && (
                <div className='mb-2'>
                    <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
                        Simulation Results
                    </h3>

                    {/* Stats Cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2'>
                        {/* Card: Total Backups */}
                        <div className='bg-blue-50 dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/50'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-blue-600 dark:text-blue-300 font-medium mb-0'>Total Backups</p>
                                    <p className='text-2xl font-bold text-blue-800 dark:text-blue-200 mb-0'>{stats.totalBackups}</p>
                                    <p className='text-sm text-blue-600 dark:text-blue-300 mb-0'>
                                        <span className='font-medium'>{stats.keptBackups} kept</span> | <span className='font-medium'>{stats.deletedBackups} deleted</span>
                                    </p>
                                </div>
                                <div className='bg-blue-100 dark:bg-blue-900/80 p-1 rounded-full self-start'><HardDrive className='w-2 h-2 text-blue-600 dark:text-blue-300'/></div>
                            </div>
                        </div>

                        {/* Card: Storage Used */}
                        <div className='bg-green-50 dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-green-100 dark:border-green-900/50'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-green-600 dark:text-green-300 font-medium mb-0'>Storage Used (Kept)</p>
                                    <p className='text-2xl font-bold text-green-800 dark:text-green-200 mb-0'>{stats.totalSizeGB} GB</p>
                                    <p className='text-sm text-green-600 dark:text-green-300 mb-0'>
                                        {stats.totalSizeMB.toLocaleString()} MB | {policy.maxTotalGiB > 0 ? `${((parseFloat(stats.totalSizeGB) / policy.maxTotalGiB) * 100).toFixed(1)}% of limit` : 'Limit ∞'}
                                    </p>
                                </div>
                                <div className='bg-green-100 dark:bg-green-900/80 p-1 rounded-full self-start'><HardDrive className='w-2 h-2 text-green-600 dark:text-green-300'/></div>
                            </div>
                        </div>

                        {/* Card: Time Retention */}
                        <div className='bg-purple-50 dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-purple-100 dark:border-purple-900/50'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-purple-600 dark:text-purple-300 font-medium mb-0'>Kept by Time Policy</p>
                                    <p className='text-2xl font-bold text-purple-800 dark:text-purple-200 mb-0'>{stats.dailyCount + stats.weeklyCount + stats.monthlyCount}</p>
                                    <p className='text-sm text-purple-600 dark:text-purple-300 mb-0'>
                                        {stats.dailyCount} D | {stats.weeklyCount} W | {stats.monthlyCount} M
                                    </p>
                                </div>
                                <div className='bg-purple-100 dark:bg-purple-900/80 p-1 rounded-full self-start'><Calendar className='w-2 h-2 text-purple-600 dark:text-purple-300'/></div>
                            </div>
                        </div>

                        {/* Card: Protected */}
                        <div className='bg-red-50 dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-red-100 dark:border-red-900/50'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-red-600 dark:text-red-300 font-medium mb-0'>Protected (Kept)</p>
                                    <p className='text-2xl font-bold text-red-800 dark:text-red-200 mb-0'>{stats.protectedCount}</p>
                                    <p className='text-sm text-red-600 dark:text-red-300 mb-0'>Always kept</p>
                                </div>
                                <div className='bg-red-100 dark:bg-red-900/80 p-1 rounded-full self-start'><Award className='w-2 h-2 text-red-600 dark:text-red-300'/></div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2'>
                        <div className='flex items-center space-x-1'>
                            <Filter className='w-1 h-1 text-gray-500 dark:text-gray-400'/>
                            <label htmlFor="filter-status" className='text-sm text-gray-600 dark:text-gray-300 font-medium min-w-12 sm:min-w-0'>Status:</label>
                            <select
                                id="filter-status"
                                value={filterStatus}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value as FilterStatus)}
                                className='block px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 flex-grow'
                            >
                                <option value='all'>All Backups ({backups.length})</option>
                                <option value='kept'>Kept ({stats?.keptBackups ?? 0})</option>
                                <option value='deleted'>Deleted ({stats?.deletedBackups ?? 0})</option>
                            </select>
                        </div>

                        <div className='flex items-center space-x-1'>
                            <Tag className='w-1 h-1 text-gray-500 dark:text-gray-400'/>
                            <label htmlFor="filter-tag" className='text-sm text-gray-600 dark:text-gray-300 font-medium min-w-12 sm:min-w-0'>Tag:</label>
                            <select
                                id="filter-tag"
                                value={filterTag}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterTag(e.target.value)}
                                className='block px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 flex-grow'
                            >
                                <option value='all'>All Tags</option>
                                {allTags.map(tag => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex items-center space-x-1'>
                            <DatabaseBackup className='w-1 h-1 text-gray-500 dark:text-gray-400'/>
                            <label htmlFor="filter-type" className='text-sm text-gray-600 dark:text-gray-300 font-medium min-w-12 sm:min-w-0'>Type:</label>
                            <select
                                id="filter-type"
                                value={filterType}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value as FilterType)}
                                className='block px-1 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm text-gray-900 dark:text-gray-100 flex-grow'
                            >
                                <option value='all'>All Types</option>
                                <option value='automatic'>Automatic</option>
                                <option value='manual'>Manual</option>
                            </select>
                        </div>
                    </div>

                    {/* Backup List Table */}
                    <div className='overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                            <tr>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Status</th>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Name</th>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Date</th>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Size</th>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Tags</th>
                                <th className='px-1 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Type</th>
                            </tr>
                            </thead>
                            <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
                            {filteredBackups.map(backup => (
                                // Table Row - Apply different style if deleted
                                <tr key={backup.id} className={backup.keep ? '' : 'bg-gray-50 dark:bg-gray-800/50 opacity-70 dark:opacity-60'}>
                                    <td className='px-1 py-1 whitespace-nowrap'>
                                        {backup.keep ? (
                                            // Kept Status Badge
                                            <span className='inline-flex items-center px-0.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                                                     <span className='h-1 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-0.5'></span> Kept
                                                 </span>
                                        ) : (
                                            // Deleted Status Badge
                                            <span className='inline-flex items-center px-0.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'>
                                                     <span className='h-1 w-1 bg-red-500 dark:bg-red-400 rounded-full mr-0.5'></span> Deleted
                                                 </span>
                                        )}
                                    </td>
                                    <td className='px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100'>{backup.id}</td>
                                    <td className='px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{formatDate(backup.date)}</td>
                                    <td className='px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right'>{backup.size} MB</td>
                                    <td className='px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                                        <div className='grid grid-rows-1 grid-cols-4 gap-1'>
                                            {/* Map through tags and apply colors using the getTagColor */}
                                            {backup.tags.map(tag => (
                                                <span key={tag} className={`px-0.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${getTagColor(tag)}`}>
                                                         {tag}
                                                     </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{backup.isAutomatic ? 'Automatic' : 'Manual'}</td>
                                </tr>
                            ))}
                            {/* Empty State Row */}
                            {filteredBackups.length === 0 && (
                                <tr>
                                    <td colSpan={6} className='px-1 py-1 text-center text-sm text-gray-500 dark:text-gray-400'>
                                        No backups match the current filters.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Usage Guide */}
            <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
                How to Use This Simulator
            </h3>
            <div className='bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 mt-2'>
                <ol className='list-decimal pl-1 space-y-1'>
                    <li>Configure schedule (Cron, Dates), random file size range (MB), and retention policy.</li>
                    <li>Click "Generate Simulation" to create backups and apply the policy.</li>
                    <li>Review the stats cards for a summary of kept/deleted counts and storage.</li>
                    <li>Use the filters (Status, Tag) to inspect the detailed backup list.</li>
                    <li>Adjust parameters and regenerate to see how changes affect retention.</li>
                </ol>
                <p className='mt-2 italic text-gray-500 dark:text-gray-400 mb-0'>
                    Note: Simulation adds random manual backups (approx. 10% of automatic count, min 1, max 15) with various tags, including a 50% chance of 'protected', to mimic real-world scenarios. The retention logic sorts backups
                    newest first and applies rules sequentially.
                </p>
            </div>
        </div>
    );
};

export default BackupSimulator;