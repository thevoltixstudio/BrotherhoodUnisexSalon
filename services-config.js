/*
  SERVICE MANAGEMENT FILE

  Add one service per line between the backticks below.
  No commas needed.

  Format:
  Category | Service Name | Description | Original Price | Discounted Price

  Lines starting with # are ignored.
*/
const serviceText = `
Hair | Men's Haircut | Professional haircut with consultation, clean finishing, and styling. | 250 | 149
Grooming | Beard Trim & Shape | Detailed beard trim, neckline cleanup, and sharp beard shape. | 180 | 99
Hair | Women's Haircut | Personalized haircut with sectioning, finish, and light styling. | 500 | 249
Treatment | Hair Spa | Relaxing nourishment treatment for dry, dull, or tired hair. | 1200 | 799
Treatment | Keratin / Smoothening | Professional hair smoothing service for a polished finish. | 4500 | 2999
Skin | Facial Cleanup | Deep cleansing care for a fresh, clean, and bright look. | 299 | 199
Skin | Detan Treatment | Face and neck detan treatment for more even-looking skin. | 499 | 249
Makeup | Party Makeup | Makeup and finishing for birthdays, events, and celebrations. | 2500 | 1999
Makeup | Bridal Makeup | Bridal makeup consultation package with occasion-ready finish. | 9000 | 7499

`;

const salonServices = serviceText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => {
    const [category, name, description, originalPrice, discountedPrice] = line.split("|").map((part) => part.trim());
    return {
      category,
      name,
      description,
      originalPrice: Number(originalPrice),
      discountedPrice: Number(discountedPrice)
    };
  })
  .filter((service) => service.category && service.name && service.description && !Number.isNaN(service.originalPrice) && !Number.isNaN(service.discountedPrice));
