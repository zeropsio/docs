import React from 'react';
import './calculator.css';
import jsPDF from 'jspdf';

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

export default function PricingCalculator() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [resources, setResources] = React.useState<ResourcesType>({
    cpu: 1,
    cpuType: 'shared',
    ram: 0.25,
    disk: 0.5,
    storage: 0,
    ipv4_addr: 0,
    backup: 0,
    buildTime: 0,
    egress: 0,
    core: 'lightweight',
  });

  const price = {
    cpu: resources.cpuType === 'shared' ? 0.6 : 6,
    ram: 3,
    disk: 0.05,
    storage: 0.01,
    ipv4_addr: 3,
    backup: 0.1,  // $0.50 per 5GB
    buildTime: 0.033, // $0.50 per 15 hours
    egress: 0.1, // $0.10 per 1GB
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
    // Round specific fields to appropriate decimal places
    if (['storage', 'backup', 'egress'].includes(name)) {
      formattedValue = Math.max(0, Math.round(numValue * 100) / 100); // 2 decimal places
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
                          field === 'ram' ? 0.25 : 
                          field === 'disk' ? 0.5 : 1;
          const step = field === 'ram' ? 0.25 : 
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
      ram: 0.25,
      disk: 0.5,
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
                          field === 'ram' ? 0.25 : 
                          field === 'disk' ? 0.5 : 1;
          
          // Format decimal places based on field type
          const formattedValue = field === 'ram' || field === 'disk' 
            ? Math.max(minValue, Math.round(numValue * 4) / 4) // Round to nearest 0.25
            : Math.max(minValue, Math.round(numValue));

          return { ...service, [field]: formattedValue };
        }
        return service;
      })
    );
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;
    const lineHeight = 7;
    const sectionSpacing = 20;
    const indent = 10;

    // Helper function for consistent text styling
    const addText = (text: string, x: number, y: number, options: { fontSize?: number; isBold?: boolean; isGray?: boolean; align?: 'left' | 'right' } = {}) => {
      const { fontSize = 12, isBold = false, isGray = false, align = 'left' } = options;
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      if (isGray) {
        doc.setTextColor(107, 114, 128); // Gray color
      } else {
        doc.setTextColor(17, 24, 39); // Default text color
      }
      
      if (align === 'right') {
        const textWidth = doc.getTextWidth(text);
        doc.text(text, doc.internal.pageSize.width - margin - textWidth, y);
      } else {
        doc.text(text, x, y);
      }
    };

    // Add horizontal line
    const addLine = (yPos: number) => {
      doc.setDrawColor(229, 231, 235); // Light gray
      doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos);
    };

    // Title and Package Type
    addText('Zerops Cost Calculator', margin, y, { fontSize: 24, isBold: true });
    y += lineHeight * 2;
    addText(`Selected Package: ${resources.core === 'lightweight' ? 'Lightweight' : 'Serious'} Core`, margin, y, { fontSize: 14 });
    y += lineHeight * 2;
    addLine(y - 3);
    y += lineHeight;

    // Services Section
    if (services.length > 0) {
      addText('Services', margin, y, { fontSize: 16, isBold: true });
      y += lineHeight * 1.5;

      services.forEach((service, index) => {
        addText(service.name, margin, y, { fontSize: 14, isBold: true });
        y += lineHeight;

        const details = [
          { label: 'Nodes', value: service.nodes },
          { label: 'CPU', value: `${service.cpu} (${service.cpuType})` },
          { label: 'RAM', value: `${service.ram}GB` },
          { label: 'Disk', value: `${service.disk}GB` }
        ];

        details.forEach(detail => {
          addText(`${detail.label}:`, margin + indent, y);
          addText(detail.value.toString(), margin + 80, y);
          y += lineHeight;
        });

        const serviceCost = calculateServiceCost(service);
        addText('Monthly Cost:', margin + indent, y);
        addText(`$${formatNumber(serviceCost)}`, margin + 80, y, { isBold: true });
        y += lineHeight;

        if (index < services.length - 1) {
          y += lineHeight;
          addLine(y - 3);
          y += lineHeight;
        }
      });
      y += sectionSpacing;
      addLine(y - 10);
    }

    // Additional Features Section
    if (resources.ipv4_addr > 0 || resources.storage > 0) {
      y += lineHeight;
      addText('Additional Features', margin, y, { fontSize: 16, isBold: true });
      y += lineHeight * 1.5;

      if (resources.ipv4_addr > 0) {
        addText('IPv4 Addresses:', margin, y);
        addText(`${resources.ipv4_addr} × $${price.ipv4_addr.toFixed(2)}/month`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
        y += lineHeight;
      }

      if (resources.storage > 0) {
        addText('Object Storage:', margin, y);
        addText(`${resources.storage}GB × $${price.storage.toFixed(2)}/GB/month`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
        y += lineHeight;
      }
      y += sectionSpacing - lineHeight;
      addLine(y - 10);
    }

    // Additional Costs Section
    if (resources.backup > 0 || resources.buildTime > 0 || resources.egress > 0) {
      y += lineHeight;
      addText('Additional Costs', margin, y, { fontSize: 16, isBold: true });
      y += lineHeight * 1.5;

      if (resources.backup > 0) {
        addText('Backup Space:', margin, y);
        addText(`${resources.backup}GB ($0.50 per 5GB)`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
        y += lineHeight;
      }

      if (resources.buildTime > 0) {
        addText('Build Time:', margin, y);
        addText(`${resources.buildTime} hours ($0.50 per 15 hours)`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
        y += lineHeight;
      }

      if (resources.egress > 0) {
        addText('Egress Traffic:', margin, y);
        addText(`${resources.egress}GB ($0.10 per 1GB)`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
        y += lineHeight;
      }
      y += sectionSpacing - lineHeight;
      addLine(y - 10);
    }

    // Total Section
    y += lineHeight;
    addText('Core Package:', margin, y);
    addText(`${resources.core === 'lightweight' ? 'Lightweight' : 'Serious'} ($${resources.core === 'lightweight' ? '0.00' : '10.00'}/month)`, doc.internal.pageSize.width - margin - 80, y, { align: 'right' });
    y += lineHeight * 2;

    // Final total with larger font
    addText('Total Monthly Cost:', margin, y, { fontSize: 16, isBold: true });
    addText(`$${calculateTotal()}`, doc.internal.pageSize.width - margin - 80, y, { fontSize: 16, isBold: true, align: 'right' });

    // Save the PDF
    doc.save('zerops-cost-calculator.pdf');
  };

  return (
    <div className="pt-2">
      <div className="package-selection">
        <h2 className="package-title">Project core package</h2>
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

        <a 
          href="#project-plans" 
          className="comparison-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          Show full package comparison & limits
        </a>
      </div>

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
                  disabled={service.ram <= 0.25}
                >
                  -
                </button>
                <input 
                  type="number" 
                  className="number-input" 
                  value={service.ram}
                  onChange={(e) => handleServiceInputChange(service.id, 'ram', e.target.value)}
                  min={0.25}
                  step={0.25}
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
                  disabled={service.disk <= 0.5}
                >
                  -
                </button>
                <input 
                  type="number" 
                  className="number-input" 
                  value={service.disk}
                  onChange={(e) => handleServiceInputChange(service.id, 'disk', e.target.value)}
                  min={0.5}
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

      <button className="add-service w-full mb-1" onClick={addService}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add Service</span>
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
            <span className="resource-price">$0.10 per 1GB</span>
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
        className="export-button w-full"
        onClick={exportToPDF}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export as PDF
      </button>
    </div>
  );
}
