/*
  WEBSITE DETAILS FILE

  Edit the text after = only.
  No commas and no quotes needed.
*/
const salonDetailsText = `
salonName = Brotherhood Unisex Salon
shortName = Brotherhood
tagline = Premium grooming, hair, skin, and makeup studio in Darbhanga.
logoImage = images/logo.png
phoneDisplay = 98761 52436
phoneLink = +919876152436
email = durgeshjha452@gmail.com
formSubmitAction = https://formsubmit.co/durgeshjha452@gmail.com
address = Madarpur road, Banker's Colony, Donar, Darbhanga
hours = 10 AM - 9 PM Daily
mapUrl = https://www.google.com/maps/search/?api=1&query=Madarpur%20road%20Banker%27s%20Colony%20Donar%20Darbhanga
instagramUrl = #
whatsappNumber = 919876152436
whatsappMessage = Hello Brotherhood Unisex Salon, I want to enquire about your services.
`;

const salonDetails = {};

salonDetailsText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .forEach((line) => {
    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key) salonDetails[key] = value;
  });
