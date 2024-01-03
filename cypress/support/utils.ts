export const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

export const setMobileViewport = () => {
  const device: Cypress.ViewportPreset = Cypress.env("DEVICE");
  const availableDevices = ['macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6+', 'iphone-se2', 'iphone-8', 'iphone-7', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3', 'samsung-s10', 'samsung-note9']

  type CustomViewport = { name: string, viewportHeight: number, viewportWidth: number }
  const customDevices: CustomViewport[] = [
    {
      name: "iphone-15",
      viewportWidth: 393,
      viewportHeight: 852
    },
    {
      name:"samsung-galaxy-s23-plus",
      viewportWidth: 360,
      viewportHeight: 780
    },
    {
      name:"iphone-15-pro-max",
      viewportWidth: 430,
      viewportHeight: 932
    }
  ]
  switch (true) {
    case device == null:
      cy.log("No CYPRESS_DEVICE passed. Omit mobile viewport");
      break;
    case availableDevices.includes(device):
      cy.viewport(device);
      break;
    case (customDevices.findIndex(d => d.name === device) !== -1):
      const _device = customDevices.find( d => d.name === device)
      cy.log(`Set viewport of ${_device?.name}`);

      // @ts-ignore
      cy.viewport(_device?.viewportWidth, _device?.viewportHeight);
      break;
    default:
      throw new Error("No matching Cypress.ViewportPreset was passed for CYPRESS_DEVICE env variable!");
  }
}