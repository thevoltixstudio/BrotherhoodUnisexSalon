/*
  GALLERY IMAGE FILE

  Best method:
  1. Put your photos inside the images folder.
  2. Add only the file name below.

  Example:
  salon-front.jpg
  haircut-style.jpg

  No commas needed.
  Google Drive links often do not work reliably on websites.
*/
const galleryImageText = `
Photo1.jpg
photo2.jpg
photo3.jpg
photo4.jpg
Photo5.jpg
photo6.jpg
photo7.jpg
`;

const galleryImages = galleryImageText
  .split("\n")
  .map((link) => link.trim())
  .filter((link) => link && !link.startsWith("#"))
  .map((link) => {
    if (link.startsWith("http://") || link.startsWith("https://") || link.startsWith("images/")) {
      return link;
    }

    return `images/${link}`;
  });
