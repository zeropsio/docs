import React from 'react';
import { Button, InputText } from 'docs-ui';

type ResourcesType = {
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  ram: number;
  disk: number;
  storage: number;
  ipv4_addr: boolean;
  core: 'lightweight' | 'serious';
};

export default function PricingCalculator() {
  const [resources, setResources] = React.useState<ResourcesType>({
    cpu: 1,
    cpuType: 'shared',
    ram: 0.25,
    disk: 0.5,
    storage: 0,
    ipv4_addr: false,
    core: 'lightweight',
  });

  const price = {
    cpu: resources.cpuType === 'shared' ? 0.6 : 6,
    ram: 0.75,
    disk: 0.05,
    storage: 0.01,
    ipv4_addr: 3,
    core: resources.core === 'lightweight' ? 0.0 : 10.0,
  };

  const handleAdjust = (name: string, amount: number) => {
    setResources((prev) => {
      const newValue = Number(
        ((prev[name as keyof typeof prev] as number) + amount).toFixed(2)
      );
      const minValue = name === 'cpu' ? 1 : 0;
      return {
        ...prev,
        [name]: Math.max(minValue, newValue),
      };
    });
  };

  const handleChange = (name: string, value: number | string | boolean) => {
    setResources((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const total =
      resources.cpu * price.cpu +
      resources.ram * price.ram +
      resources.disk * price.disk +
      resources.storage * price.storage +
      (resources.ipv4_addr ? price.ipv4_addr : 0) +
      price.core;

    return total.toFixed(2);
  };

  const isMinValue = (name: string, value: number) => {
    const minValues = {
      cpu: 1,
      ram: 0.25,
      disk: 0.5,
      storage: 0,
    };
    return value <= minValues[name as keyof typeof minValues];
  };

  return (
    <div className="p-1.5 space-y-4 bg-ui-bg-base rounded-lg">
      <form className="grid grid-cols-2 gap-2">
        <div className="space-y-0.25">
          <label htmlFor="cpu" className="font-semibold text-lg">
            No. of CPUs
          </label>
          <div className="flex items-center space-x-0.5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('cpu', -1);
              }}
              variant="secondary"
              disabled={isMinValue('cpu', resources.cpu)}
            >
              -
            </Button>
            <InputText
              type="number"
              min="1"
              id="cpu"
              name="cpu"
              value={resources.cpu}
              className="text-center"
              readOnly
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('cpu', 1);
              }}
              variant="secondary"
            >
              +
            </Button>
          </div>
        </div>
        <div className="space-y-0.25">
          <label htmlFor="cpuType" className="font-semibold text-lg">
            CPU type
          </label>
          <select
            name="cpuType"
            id="cpuType"
            value={resources.cpuType}
            onChange={(e) => handleChange('cpuType', e.target.value)}
            className="w-full rounded-sm border-ui-border-base p-0.5"
          >
            <option value="shared">Shared CPU</option>
            <option value="dedicated">Dedicated CPU</option>
          </select>
        </div>
        <div className="space-y-0.25">
          <label htmlFor="ram" className="font-semibold text-lg">
            RAM (in GB)
          </label>
          <div className="flex items-center space-x-0.5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('ram', -0.25);
              }}
              variant="secondary"
              disabled={isMinValue('ram', resources.ram)}
            >
              -
            </Button>
            <InputText
              type="number"
              min="0.25"
              id="ram"
              name="ram"
              value={resources.ram}
              className="text-center"
              readOnly
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('ram', 0.25);
              }}
              variant="secondary"
            >
              +
            </Button>
          </div>
        </div>
        <div className="space-y-0.25">
          <label htmlFor="disk" className="font-semibold text-lg">
            Disk space (in GB)
          </label>
          <div className="flex items-center space-x-0.5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('disk', -0.5);
              }}
              variant="secondary"
              disabled={isMinValue('disk', resources.disk)}
            >
              -
            </Button>
            <InputText
              type="number"
              min="0.5"
              id="disk"
              name="disk"
              value={resources.disk}
              className="text-center"
              readOnly
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('disk', 0.5);
              }}
              variant="secondary"
            >
              +
            </Button>
          </div>
        </div>
        <div className="space-y-0.25">
          <label htmlFor="storage" className="font-semibold text-lg">
            Object storage (in GB)
          </label>
          <div className="flex items-center space-x-0.5">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('storage', -1);
              }}
              variant="secondary"
              disabled={isMinValue('storage', resources.storage)}
            >
              -
            </Button>
            <InputText
              type="number"
              min="0"
              id="storage"
              name="storage"
              value={resources.storage}
              className="text-center"
              readOnly
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdjust('storage', 1);
              }}
              variant="secondary"
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-0.25">
          <label htmlFor="core" className="font-semibold text-lg">
            Project core package
          </label>
          <select
            name="core"
            id="core"
            value={resources.core}
            onChange={(e) => handleChange('core', e.target.value)}
            className="w-full rounded-sm border-ui-border-base p-0.5"
          >
            <option value="lightweight">Lightweight</option>
            <option value="serious">Serious</option>
          </select>
        </div>
        <div className="space-y-0.25 col-span-2 flex items-center">
          <label
            htmlFor="ipv4_addr"
            className="font-semibold text-lg flex items-center gap-0.5"
          >
            <input
              type="checkbox"
              id="ipv4_addr"
              name="ipv4_addr"
              checked={resources.ipv4_addr}
              onChange={(e) =>
                setResources((prev) => ({
                  ...prev,
                  ipv4_addr: e.target.checked,
                }))
              }
              className="rounded border-ui-border-base"
            />
            Unique IPv4 Address
          </label>
        </div>
      </form>
      <p className="text-2xl">
        <span className="font-bold">Total price:</span> ${calculateTotal()} / 30
        days (approx.)
      </p>
    </div>
  );
}
