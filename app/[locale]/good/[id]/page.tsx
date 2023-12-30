import { fetchSpecificGood } from "@/utils";
import { GoodProps } from "@/types";
import {
  AddToCartBtn,
  Carousel,
  CldImage,
  CommentsBlock,
  CommentsList,
} from "../../components";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

const Good = async ({ params }: { params: { id: string } }) => {
  const good: GoodProps = await fetchSpecificGood(params.id);
  const t = await getTranslations("good");

  return (
    <>
      <div className="mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] mx-auto p-5 mt-[120px]">
        <div className="flex flex-col md:flex-row rounded-2xl mb-7">
          <CldImage
            src={good.photoURL}
            width={400}
            height={400}
            alt="good"
            className="rounded-2xl mr-0 mb-8 md:mb-0 md:mr-8 w-full md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]"
            crop="fill"
            gravity="auto"
          />
          <div className="flex flex-col justify-between">
            <div className="md:w-[400px] lg:w-full">
              <h1 className="text-3xl font-bold mb-[30px]">{good.title}</h1>
              <p className="mb-[20px]">{good.text}</p>
              <p className="mb-[20px]">{good.description}</p>
              <p className="mb-[30px]">
                {t("price")}: {good.price} {t("currency")}
              </p>
              <div className="flex mb-[30px] items-center">
                <AddToCartBtn id={params.id} />
                <Link
                  href="/"
                  className="flex justify-center items-center py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110 bg-[var(--primary)] text-white rounded-2xl mr-3"
                >
                  {t("backHomeBtn")}
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <CommentsBlock goodId={good._id} />
            </div>
          </div>
        </div>
        <CommentsList goodId={good._id} />
        <Carousel good={good} />
      </div>
    </>
  );
};

export default Good;
