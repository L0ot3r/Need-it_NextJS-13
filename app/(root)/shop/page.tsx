import HeroSection from '@/components/shop-components/HeroSection';
import BrandBar from '@/components/shop-components/BrandBar';
import ProductsList from '@/components/shop-components/ProductsList';

import { getAllProducts } from '@/lib/actions/product.actions';

export default async function HomeShop() {
	const products = await getAllProducts();
	if (!products) return;

	return (
		<div className='flex flex-col w-full max-w-10xl'>
			<HeroSection />
			<BrandBar />
			<div className='p-8 flex flex-col gap-10'>
				{/* Map des deux grille 'Nouvel arrivage' et 'Meilleures Ventes' */}
				<ProductsList title='Nouvel arrivage' data={products} maxItems={5} />
				<ProductsList title='Meilleures Ventes' data={products} maxItems={3} />
			</div>
		</div>
	);
}
