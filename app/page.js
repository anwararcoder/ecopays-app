import HeaderSec from "@/Components/Sections/HeaderSec/HeaderSec";
import CategoriesSec from "@/Components/Sections/CategoriesSec/CategoriesSec";
import ProductsSec from "@/Components/Sections/ProductsSec/ProductsSec";
import HowItWorkSec from "@/Components/Sections/HowItWorkSec/HowItWorkSec";
import PeopleTalkSec from "@/Components/Sections/PeopleTalkSec/PeopleTalkSec";

export default function Home() {
  const limit = 8;
  const categoriesIds = ["66953e3d5e8fc279f150b2e6", "66953e4e5e8fc279f150b2e9"].map( val => 'category[in][]=' + val ).join("&")
  return (
    <>
      <HeaderSec />
      <CategoriesSec />
      <ProductsSec subTitle="Our Products" title="Explore our Products" limit={limit} />
      <HowItWorkSec />
      <ProductsSec subTitle="What's trending now In Phones" title="Discover the most trending products in Ecopays" limit='4' categoriesIds={categoriesIds} />
      <PeopleTalkSec />
    </>
  );
}
