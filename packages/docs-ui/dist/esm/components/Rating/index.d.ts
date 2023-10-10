import React from "react";
export type RatingProps = {
    event?: string;
    className?: string;
    onRating?: (rating?: number) => void;
    additionalQuestion?: string;
    parentNotificationId?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Rating: React.FC<RatingProps>;
//# sourceMappingURL=index.d.ts.map