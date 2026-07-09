import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrums({ product }) {
    return (
        <div className="w-full bg-white rounded-xl border shadow-sm px-3 sm:px-4 py-2 sm:py-3 mb-4 overflow-hidden">
            <Breadcrumb>
                <BreadcrumbList className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/"
                            className="font-medium text-gray-500 hover:text-pink-500 transition"
                        >
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="text-gray-400" />

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/products"
                            className="font-medium text-gray-500 hover:text-pink-500 transition"
                        >
                            Products
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="text-gray-400" />

                    <BreadcrumbItem className="min-w-0">
                        <BreadcrumbPage className="font-semibold text-pink-500 truncate max-w-[120px] sm:max-w-[220px] md:max-w-[350px] lg:max-w-[500px]">
                            {product?.productName}
                        </BreadcrumbPage>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default Breadcrums;