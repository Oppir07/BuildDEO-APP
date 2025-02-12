import PageHead from "@/components/shared/page-head";
import Profil from '../../../../public/profil.png';

export default function DetailGuestOffers() {
  return (
    <>
      <PageHead title="Detail Order Done" />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-xl text-gray-500 font-semibold">Detail Offers</h1>
        </div>

        <div className="flex gap-6">
          {/* Image Section */}
          <div className="w-full md:w-1/3">
              <img
                src={Profil}
                className="rounded-lg object-cover w-full"
                alt="Service"
              />
            </div>

          {/* Details Section */}
          <div className="w-2/3">
            <h2 className="text-2xl text-black font-bold mb-2">Lay LVT: up to 20 m²</h2>
            <p className="text-red-500 text-xl font-semibold mb-4">119€</p>

            <div className="space-y-2 text-black">
            <p>Name: Edward Panjaitan</p>
              <p>Street: No 15 uti street off ovie palace road effurun delta state</p>
              <p>City & zip code: 22411</p>
              <p>Telp. Number: +49 05745 09056</p>
              <p>E-mail: edu29@gmail.com</p>
              <br />
              <p><strong>Description</strong></p>
              <p className="text-gray-700 leading-relaxed">
                Transform your space with our professional painting services! Whether you’re looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="/admin-manage-offers"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
                >
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
