import React from 'react';
import './calculator.css';
import jsPDF from 'jspdf';
import BrowserOnly from '@docusaurus/BrowserOnly';

type ResourcesType = {
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  ram: number;
  disk: number;
  storage: number;
  ipv4_addr: number;
  backup: number;
  buildTime: number;
  egress: number;
  core: 'lightweight' | 'serious';
};

type Service = {
  id: string;
  name: string;
  nodes: number;
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  ram: number;
  disk: number;
};

function PricingCalculatorContent() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [resources, setResources] = React.useState<ResourcesType>({
    cpu: 1,
    cpuType: 'shared',
    ram: 0.125,
    disk: 1,
    storage: 0,
    ipv4_addr: 0,
    backup: 0,
    buildTime: 0,
    egress: 0,
    core: 'lightweight',
  });

  // Load saved data when component mounts
  React.useEffect(() => {
    try {
      const savedServices = localStorage.getItem('zerops-calculator-services');
      const savedResources = localStorage.getItem('zerops-calculator-resources');

      if (savedServices) {
        setServices(JSON.parse(savedServices));
      }

      if (savedResources) {
        setResources(JSON.parse(savedResources));
      }
    } catch (error) {
      console.warn('Failed to load saved calculator data:', error);
    }
  }, []);

  // Save data when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('zerops-calculator-services', JSON.stringify(services));
    } catch (error) {
      console.warn('Failed to save services data:', error);
    }
  }, [services]);

  React.useEffect(() => {
    try {
      localStorage.setItem('zerops-calculator-resources', JSON.stringify(resources));
    } catch (error) {
      console.warn('Failed to save resources data:', error);
    }
  }, [resources]);

  const clearAll = () => {
    setServices([]);
    setResources({
      cpu: 1,
      cpuType: 'shared',
      ram: 0.125,
      disk: 1,
      storage: 0,
      ipv4_addr: 0,
      backup: 0,
      buildTime: 0,
      egress: 0,
      core: 'lightweight',
    });
  };

  const price = {
    cpu: resources.cpuType === 'shared' ? 0.6 : 6,
    ram: 3,
    disk: 0.05,
    storage: 0.01,
    ipv4_addr: 3,
    backup: 0.1,
    buildTime: 0.033,
    egress: 0.02,
    core: resources.core === 'lightweight' ? 0.0 : 10.0,
  };

  const handleAdjust = (name: keyof ResourcesType, amount: number) => {
    setResources((prev) => ({
      ...prev,
      [name]: Math.max(0, Number(prev[name]) + amount),
    }));
  };

  const handleInputChange = (name: keyof ResourcesType, value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    let formattedValue = numValue;
    if (['storage', 'backup', 'egress'].includes(name)) {
      formattedValue = Math.max(0, Math.round(numValue * 100) / 100);
    } else {
      formattedValue = Math.max(0, Math.round(numValue));
    }

    setResources(prev => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleServiceAdjust = (serviceId: string, field: keyof Service, amount: number) => {
    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const minValue = field === 'nodes' ? 1 :
                          field === 'ram' ? 0.125 :
                          field === 'disk' ? 1 : 1;
          const step = field === 'ram' ? 0.125 :
                      field === 'disk' ? 0.5 : 1;
          const newValue = Math.max(minValue, service[field] as number + amount * step);
          return { ...service, [field]: newValue };
        }
        return service;
      })
    );
  };

  const handleServiceTypeChange = (serviceId: string, cpuType: 'shared' | 'dedicated') => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId ? { ...service, cpuType } : service
      )
    );
  };

  const handleServiceNameChange = (serviceId: string, newName: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId ? { ...service, name: newName } : service
      )
    );
  };

  const removeService = (serviceId: string) => {
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const addService = () => {
    const newService: Service = {
      id: `service-${services.length + 1}`,
      name: `Service ${services.length + 1}`,
      nodes: 1,
      cpu: 1,
      cpuType: 'shared',
      ram: 0.125,
      disk: 1,
    };
    setServices([...services, newService]);
  };

  const calculateServiceCost = (service: Service) => {
    const cpuPrice = service.cpuType === 'shared' ? 0.6 : 6;
    return service.nodes * (
      service.cpu * cpuPrice +
      service.ram * price.ram +
      service.disk * price.disk
    );
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calculateTotal = () => {
    const servicesCost = services.reduce((total, service) => total + calculateServiceCost(service), 0);
    const additionalCost =
      resources.storage * price.storage +
      resources.ipv4_addr * price.ipv4_addr +
      resources.backup * price.backup +
      resources.buildTime * price.buildTime +
      resources.egress * price.egress +
      price.core;

    return formatNumber(servicesCost + additionalCost);
  };

  const handleServiceInputChange = (serviceId: string, field: keyof Service, value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const minValue = field === 'nodes' ? 1 :
                          field === 'ram' ? 0.125 :
                          field === 'disk' ? 1 : 1;

          const formattedValue = field === 'ram' || field === 'disk'
            ? Math.max(minValue, Math.round(numValue * 4) / 4)
            : Math.max(minValue, Math.round(numValue));

          return { ...service, [field]: formattedValue };
        }
        return service;
      })
    );
  };

const exportToPDF = () => {
  // Calculate individual resource costs
  const calculateResourceCosts = (service) => {
    const cpuPrice = service.cpuType === 'shared' ? 0.6 : 6;
    return {
      cpu: service.nodes * service.cpu * cpuPrice,
      ram: service.nodes * service.ram * price.ram,
      disk: service.nodes * service.disk * price.disk
    };
  };

  // Open print window
  const printWindow = window.open('', '', 'width=800,height=600');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Zerops Cost Estimate</title>
      <style>
        body {
          font-family: -apple-system, system-ui, sans-serif;
          line-height: 1.5;
          color: #333;
          margin: 0;
          padding: 20px;
          font-size: 14px;
        }
        .header {
          background: #68BAB2;
          color: white;
          padding: 25px;
          margin: -20px -20px 20px -20px;
        }
        .header h1 {
          font-size: 24px;
          margin: 0;
        }
        .header p {
          font-size: 14px;
          margin: 8px 0 0 0;
          opacity: 0.9;
        }
        .section {
          margin: 25px 0;
          padding: 20px;
          background: #ECEFF3;
          border-radius: 4px;
        }
        .section h2 {
          font-size: 18px;
          margin: 0 0 15px 0;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
          padding: 6px 0;
          font-size: 14px;
        }
        .service-name {
          font-weight: bold;
          font-size: 16px;
          color: #68BAB2;
          margin: 20px 0 10px 0;
          padding-bottom: 5px;
          border-bottom: 2px solid #68BAB2;
        }
        .resource-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          margin-left: 15px;
          font-size: 13px;
          color: #555;
        }
        .service-total {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          margin-top: 5px;
          font-weight: bold;
          border-top: 1px solid #ddd;
        }
        .total {
          background: #68BAB2;
          color: white;
          padding: 20px;
          margin: 25px -20px;
        }
        .total .row {
          border: none;
          font-size: 16px;
        }
        .total .row strong {
          font-size: 20px;
        }
        .footer {
          font-size: 12px;
          color: #666;
          margin-top: 25px;
          line-height: 1.5;
        }
        @media print {
          body { padding: 20px; }
          .header, .total {
            background: #68BAB2 !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Zerops Cost Estimate</h1>
        <p>Generated on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </div>

    <div class="section">
        <h2>Project Configuration</h2>
        <div class="row">
          <span>Selected Plan: ${resources.core === 'lightweight' ? 'Lightweight' : 'Serious'}</span>
          <strong>$${price.core.toFixed(2)}</strong>
        </div>
      </div>

${services.map(service => {
  const resourceCosts = calculateResourceCosts(service);
  return `
    <div>
      <div class="service-name">${service.name}</div>
      <div class="resource-row">
        <span>CPU</span>
        <span>(${service.cpu} ${service.cpuType}, ${service.nodes} nodes) @ $${service.cpuType === 'shared' ? '0.60' : '6.00'}/CPU = $${formatNumber(resourceCosts.cpu)}</span>
      </div>
      <div class="resource-row">
        <span>RAM</span>
        <span>(${service.ram}GB × ${service.nodes} nodes) @ $3.00/GB = $${formatNumber(resourceCosts.ram)}</span>
      </div>
      <div class="resource-row">
        <span>Disk</span>
        <span>(${service.disk}GB × ${service.nodes} nodes) @ $0.05/GB = $${formatNumber(resourceCosts.disk)}</span>
      </div>
      <div class="service-total">
        <span>Service Total</span>
        <span>$${formatNumber(calculateServiceCost(service))}</span>
      </div>
    </div>
  `;
}).join('')}

      <div class="section">
        <h2>Additional Features</h2>
        ${resources.ipv4_addr > 0 ? `
          <div class="row">
            <span>Dedicated IPv4 (${resources.ipv4_addr})</span>
            <span>$${formatNumber(resources.ipv4_addr * price.ipv4_addr)}</span>
          </div>
        ` : ''}
        ${resources.storage > 0 ? `
          <div class="row">
            <span>Object Storage (${resources.storage} GB)</span>
            <span>$${formatNumber(resources.storage * price.storage)}</span>
          </div>
        ` : ''}
        ${resources.backup > 0 ? `
          <div class="row">
            <span>Extra Backup Space (${resources.backup} GB)</span>
            <span>$${formatNumber(resources.backup * price.backup)}</span>
          </div>
        ` : ''}
        ${resources.buildTime > 0 ? `
          <div class="row">
            <span>Extra Build Time (${resources.buildTime} hours)</span>
            <span>$${formatNumber(resources.buildTime * price.buildTime)}</span>
          </div>
        ` : ''}
        ${resources.egress > 0 ? `
          <div class="row">
            <span>Extra Egress (${resources.egress} GB)</span>
            <span>$${formatNumber(resources.egress * price.egress)}</span>
          </div>
        ` : ''}
      </div>

      <div class="total">
        <div class="row">
          <span>Total Monthly Cost</span>
          <strong>$${calculateTotal()}</strong>
        </div>
      </div>

      <div class="footer">
        <p>All prices are in USD and calculated for a 30-day period</p>
        <p>Resources are billed by the minute with hourly credit deduction based on actual usage</p>
      </div>

      <script>
        window.onload = () => {
          window.print();
          window.onfocus = () => { window.close(); }
        }
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
};

  return (
    <div className="pt-1">
      <div className="package-selection">
        <div className="package-options">
          <div
            className={`package-option ${resources.core === 'lightweight' ? 'selected' : ''}`}
            onClick={() => setResources(prev => ({ ...prev, core: 'lightweight' }))}
          >
            <div className="package-option-name">Lightweight</div>
            <div className="package-price">
              $0<span>/30 days</span>
            </div>
            <div className="package-description">
              Single-container core services with modest build hours, backup storage, and egress bandwidth included. <span className="package-highlight">Ideal for development and smaller production projects.</span>
            </div>
          </div>

          <div
            className={`package-option ${resources.core === 'serious' ? 'selected' : ''}`}
            onClick={() => setResources(prev => ({ ...prev, core: 'serious' }))}
          >
            <div className="package-option-name">Serious</div>
            <div className="package-price">
              $10<span>/30 days</span>
            </div>
            <div className="package-description">
              Highly available core services with generous build hours, backup storage, and egress bandwidth included. <span className="package-highlight">Perfect for production workloads that mean business.</span>
            </div>
          </div>
        </div>
      </div>

      <button className="add-service w-full mb-4" onClick={addService}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add Service</span>
      </button>

      {services.map((service) => (
        <div key={service.id} className="feature-section">
          <div className="flex justify-between items-start mb-0.5">
            <div>
              <input
                type="text"
                className="service-name-input"
                value={service.name}
                onChange={(e) => handleServiceNameChange(service.id, e.target.value)}
                placeholder="Service Name"
              />
            </div>
            <button
              className="remove-button"
              onClick={() => removeService(service.id)}
              aria-label="Remove service"
            >
              ×
            </button>
          </div>

          <div className="space-y-1">
            <div className="resource-row">
              <div className="resource-info">
                <span className="resource-name">Nodes</span>
              </div>
              <div className="controls">
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'nodes', -1)}
                  disabled={service.nodes <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="number-input"
                  value={service.nodes}
                  onChange={(e) => handleServiceInputChange(service.id, 'nodes', e.target.value)}
                  min={1}
                  step={1}
                />
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'nodes', 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="resource-row">
              <div className="resource-info">
                <span className="resource-name">CPU</span>
                <span className="resource-price">
                  ${service.cpuType === 'shared' ? '0.60' : '6.00'} / CPU / month
                </span>
              </div>
              <div className="flex gap-1">
                <select
                  className="calculator-select"
                  value={service.cpuType}
                  onChange={(e) => handleServiceTypeChange(service.id, e.target.value as 'shared' | 'dedicated')}
                >
                  <option value="shared">Shared</option>
                  <option value="dedicated">Dedicated</option>
                </select>
                <div className="controls">
                  <button
                    className="calculator-button"
                    onClick={() => handleServiceAdjust(service.id, 'cpu', -1)}
                    disabled={service.cpu <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="number-input"
                    value={service.cpu}
                    onChange={(e) => handleServiceInputChange(service.id, 'cpu', e.target.value)}
                    min={1}
                    step={1}
                  />
                  <button
                    className="calculator-button"
                    onClick={() => handleServiceAdjust(service.id, 'cpu', 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="resource-row">
              <div className="resource-info">
                <span className="resource-name">RAM (GB)</span>
                <span className="resource-price">${price.ram.toFixed(2)} / GB / month</span>
              </div>
              <div className="controls">
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'ram', -1)}
                  disabled={service.ram <= 0.125}
                >
                  -
                </button>
                <input
                  type="number"
                  className="number-input"
                  value={service.ram}
                  onChange={(e) => handleServiceInputChange(service.id, 'ram', e.target.value)}
                  min={0.125}
                  step={0.125}
                />
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'ram', 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="resource-row">
              <div className="resource-info">
                <span className="resource-name">Disk (GB)</span>
                <span className="resource-price">${price.disk.toFixed(2)} / GB / month</span>
              </div>
              <div className="controls">
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'disk', -1)}
                  disabled={service.disk <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="number-input"
                  value={service.disk}
                  onChange={(e) => handleServiceInputChange(service.id, 'disk', e.target.value)}
                  min={1}
                  step={0.5}
                />
                <button
                  className="calculator-button"
                  onClick={() => handleServiceAdjust(service.id, 'disk', 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Resources: Nodes: {service.nodes} | RAM: {service.ram}GB | Disk: {service.disk}GB
            </div>
          </div>
        </div>
      ))}

        <button
          className="comparison-button !text-gray-700 dark:!text-gray-300 w-[100px]"
          onClick={clearAll}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          Clear All
        </button>

      <div className="feature-section">
        <div className="section-title">Additional Features</div>

        <div className="resource-row">
          <div className="resource-info">
            <span className="resource-name">Unique IPv4 Addresses</span>
            <span className="resource-price">${price.ipv4_addr.toFixed(2)} / address / month</span>
          </div>
          <div className="controls">
            <button
              onClick={() => handleAdjust('ipv4_addr', -1)}
              disabled={resources.ipv4_addr === 0}
              className="calculator-button"
            >
              -
            </button>
            <input
              type="number"
              className="number-input"
              value={resources.ipv4_addr}
              onChange={(e) => handleInputChange('ipv4_addr', e.target.value)}
              min={0}
            />
            <button
              onClick={() => handleAdjust('ipv4_addr', 1)}
              className="calculator-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="resource-row">
          <div className="resource-info">
            <span className="resource-name">Object Storage (GB)</span>
            <span className="resource-price">${price.storage.toFixed(2)} / GB / month</span>
          </div>
          <div className="controls">
            <button
              onClick={() => handleAdjust('storage', -1)}
              disabled={resources.storage === 0}
              className="calculator-button"
            >
              -
            </button>
            <input
              type="number"
              className="number-input"
              value={resources.storage}
              onChange={(e) => handleInputChange('storage', e.target.value)}
              min={0}
            />
            <button
              onClick={() => handleAdjust('storage', 1)}
              className="calculator-button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="feature-section">
        <div className="section-title">Additional Costs</div>

        <div className="resource-row">
          <div className="resource-info">
            <span className="resource-name">Backup Space (GB)</span>
            <span className="resource-price">$0.50 per 5GB</span>
          </div>
          <div className="controls">
            <button
              onClick={() => handleAdjust('backup', -1)}
              disabled={resources.backup === 0}
              className="calculator-button"
            >
              -
            </button>
            <input
              type="number"
              className="number-input"
              value={resources.backup}
              onChange={(e) => handleInputChange('backup', e.target.value)}
              min={0}
            />
            <button
              onClick={() => handleAdjust('backup', 1)}
              className="calculator-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="resource-row">
          <div className="resource-info">
            <span className="resource-name">Build Time (hours)</span>
            <span className="resource-price">$0.50 per 15 hours</span>
          </div>
          <div className="controls">
            <button
              onClick={() => handleAdjust('buildTime', -1)}
              disabled={resources.buildTime === 0}
              className="calculator-button"
            >
              -
            </button>
            <input
              type="number"
              className="number-input"
              value={resources.buildTime}
              onChange={(e) => handleInputChange('buildTime', e.target.value)}
              min={0}
            />
            <button
              onClick={() => handleAdjust('buildTime', 1)}
              className="calculator-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="resource-row">
          <div className="resource-info">
            <span className="resource-name">Egress Traffic (GB)</span>
            <span className="resource-price">$0.02 per 1GB</span>
          </div>
          <div className="controls">
            <button
              onClick={() => handleAdjust('egress', -1)}
              disabled={resources.egress === 0}
              className="calculator-button"
            >
              -
            </button>
            <input
              type="number"
              className="number-input"
              value={resources.egress}
              onChange={(e) => handleInputChange('egress', e.target.value)}
              min={0}
            />
            <button
              onClick={() => handleAdjust('egress', 1)}
              className="calculator-button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="feature-section">
        <div className="section-title">Total Monthly Cost</div>
        <div className="total-row">
          <div className="total-amount">
            ${calculateTotal()}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
          </div>
        </div>
      </div>

      <button
        className="export-button w-full flex items-center justify-center gap-2"
        onClick={exportToPDF}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export as PDF
      </button>
    </div>
  );
}

export default function PricingCalculator() {
  return (
    <BrowserOnly>
      {() => <PricingCalculatorContent />}
    </BrowserOnly>
  );
}