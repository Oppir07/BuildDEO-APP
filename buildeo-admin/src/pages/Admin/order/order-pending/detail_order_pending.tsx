import PageHead from "@/components/shared/page-head";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Profil from '../../../../../public/profil.png';

export default function DetailOrderPending() {
  return (
    <>
      <PageHead title="Detail Order Pending" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-[16px]" href="/admin-order-pending">
                    Manage Order Pending
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[16px]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-black text-[16px]">Detail Order Pending</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </h2>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3">
              <img
                src={Profil}
                className="rounded-lg object-cover w-full h-full"
                alt="Service"
              />
            </div>
            <div className="w-full md:w-2/3 px-6">
              <h3 className="text-xl font-bold text-black mb-2">Lay LVT: up to 20 m²</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Painter</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Category</span>
              </div>
              <p className="text-red-600 text-2xl font-bold mt-4">119€</p>
              <h4 className="text-lg font-semibold text-black mt-6">Overview</h4>
              <p className="text-gray-700 text-sm leading-6 mt-2">
                Transform your space with our professional painting services! Whether you're looking to refresh a single
                room or give your entire home or office a new look, our team of skilled painters is here to deliver
                top-quality results. We specialize in interior and exterior painting, using high-grade materials that
                ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer
                satisfaction, we guarantee a smooth and stress-free experience from start to finish.
              </p>
              <div className="flex justify-end">
              <a
                href="/admin-order-pending"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
                >
                Back
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
