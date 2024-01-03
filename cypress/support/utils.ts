export const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

export const setMobileViewport = () => {
  const device: Cypress.ViewportPreset = Cypress.env("DEVICE");
  const availableDevices = ['macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6+', 'iphone-se2', 'iphone-8', 'iphone-7', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3', 'samsung-s10', 'samsung-note9']

  switch (true) {
    case device == null:
      cy.log("No CYPRESS_DEVICE passed. Omit mobile viewport");
      break;
    case availableDevices.includes(device):
      cy.viewport(device);
      break;
    default:
      throw new Error("No matching Cypress.ViewportPreset was passed for CYPRESS_DEVICE env variable!");
  }
}