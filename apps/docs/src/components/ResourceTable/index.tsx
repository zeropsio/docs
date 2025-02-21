import React from 'react';

const DEFAULT_RESOURCES = {
  cpu: {
    name: 'CPU cores',
    min: '1',
    max: '5'
  },
  ram: {
    name: 'RAM',
    min: '0.125 GB',
    max: '32 GB'
  },
  disk: {
    name: 'Disk',
    min: '1 GB',
    max: '100 GB'
  }
};

const ResourceTable = ({ resources = {} }) => {
  // Merge provided resources with defaults
  const finalResources = {
    cpu: { ...DEFAULT_RESOURCES.cpu, ...resources.cpu },
    ram: { ...DEFAULT_RESOURCES.ram, ...resources.ram },
    disk: { ...DEFAULT_RESOURCES.disk, ...resources.disk }
  };

  return (
      <table className="w-full my-1.5 whitespace-nowrap table-fixed">
        <thead>
          <tr>
            <th className="w-1/6 whitespace-nowrap">&nbsp;</th>
            <th className="w-1/4">Minimum</th>
            <th className="w-1/4">Maximum</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(finalResources).map((resource, index) => (
            <tr key={index}>
              <td className="w-1/6 font-medium">{resource.name}</td>
              <td className="w-1/4">{resource.min}</td>
              <td className="w-1/4">{resource.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default ResourceTable;