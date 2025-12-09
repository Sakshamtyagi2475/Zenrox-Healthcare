const modules = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp}', { eager: true });

const productImages = Object.values(modules).map((mod) =>
  typeof mod === 'string' ? mod : mod.default
);
// console.log('Loaded images:', Object.keys(modules));
export default productImages;
