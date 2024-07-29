import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Rating from "react-rating";
import useWriteReview from "@/Hooks/useWriteReview";

const WriteReview = ({ productId, userId, productRefetch }) => {
  const initialValues = {
    review: "",
    rating: 1,
    product: productId,
    user: userId,
  };

  const validationSchema = Yup.object({
    review: Yup.string().required("Review is required"),
    rating: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .required("Rating is required"),
  });
  const addWriteReview = useWriteReview();
  const writeReviewHandelClick = async (newReview) => {
    await addWriteReview.mutateAsync(newReview);
    productRefetch()
};

  return (
    <div className="border-[1px] border-[#DDD] p-[30px] rounded-[3px] max-w-[767px] mx-auto">
      <h4 className="text-2xl font-semibold mb-[25px]">Submit Your Review</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await writeReviewHandelClick(values)
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb-[30px]">
              <label htmlFor="review" className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block">Review:</label>
              <Field as="textarea" id="review" name="review" placeholder="Submit Your Review" className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[8px] bg-[#98C1D9]/10 px-[15px] min-h-[120px]" />
              <ErrorMessage name="review" component="div" />
            </div>
            <div className="mb-[30px]">
              <label htmlFor="rating" className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block">Rating:</label>
              <Rating
                id="rating"
                name="rating"
                initialRating={values.rating}
                onChange={(value) => setFieldValue("rating", value)}
                emptySymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.987 511"
                    className="fill-[#3D5A80] w-[20px] h-[20px]"
                  >
                    <g>
                      <path d="M114.594 491.14c-5.61 0-11.18-1.75-15.934-5.187a27.223 27.223 0 0 1-10.582-28.094l32.938-145.09L9.312 214.81a27.188 27.188 0 0 1-7.976-28.907 27.208 27.208 0 0 1 23.402-18.71l147.797-13.419L230.97 17.027C235.277 6.98 245.089.492 255.992.492s20.715 6.488 25.024 16.512l58.433 136.77 147.774 13.417c10.882.98 20.054 8.344 23.425 18.711 3.372 10.368.254 21.739-7.957 28.907L390.988 312.75l32.938 145.086c2.414 10.668-1.727 21.7-10.578 28.098-8.832 6.398-20.61 6.89-29.91 1.3l-127.446-76.16-127.445 76.203c-4.309 2.559-9.11 3.864-13.953 3.864zm141.398-112.874c4.844 0 9.64 1.3 13.953 3.859l120.278 71.938-31.086-136.942a27.21 27.21 0 0 1 8.62-26.516l105.473-92.5-139.543-12.671a27.18 27.18 0 0 1-22.613-16.493L255.992 39.895 200.844 168.96c-3.883 9.195-12.524 15.512-22.547 16.43L38.734 198.062l105.47 92.5c7.554 6.614 10.858 16.77 8.62 26.54l-31.062 136.937 120.277-71.914c4.309-2.559 9.11-3.86 13.953-3.86zm-84.586-221.848s0 .023-.023.043zm169.13-.063.023.043c0-.023 0-.023-.024-.043zm0 0"></path>
                    </g>
                  </svg>
                }
                fullSymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.987 511"
                    className="fill-[#98C1D9] w-[20px] h-[20px]"
                  >
                    <g>
                      <path d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927zm0 0"></path>
                    </g>
                  </svg>
                }
              />
              <ErrorMessage name="rating" component="div" />
            </div>
            <button className="btn-1 btn-3" disabled={isSubmitting} type="submit"><span>Submit Review</span></button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WriteReview;
