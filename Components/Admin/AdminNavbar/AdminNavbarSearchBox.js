import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AdminNavbarSearchBox = () => {
  const initialValues = {
    searchText: "",
  };

  const validationSchema = Yup.object({
    searchText: Yup.string().required("Search Text Required"),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="relative">
              <Field
                id="searchText"
                name="searchText"
                placeholder="Search Here..."
                className="w-full h-[25px] bg-transparent pr-[15px] pl-[30px]"
              />
              <button
                type="submit"
                className="group inline-block absolute top-[50%] translate-y-[-50%] left-0"
              >
                <svg
                  className="fill-[#1a539a] group-hover:fill-[#3498db]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.5308 18.4693L14.8368 13.7762C16.1973 12.1428 16.8757 10.0478 16.7309 7.92691C16.5861 5.80604 15.6293 3.82265 14.0593 2.38932C12.4894 0.955989 10.4274 0.183083 8.30213 0.231383C6.17687 0.279683 4.15205 1.14547 2.64888 2.64864C1.14571 4.15181 0.279927 6.17663 0.231627 8.30188C0.183327 10.4271 0.956234 12.4892 2.38956 14.0591C3.82289 15.629 5.80629 16.5859 7.92715 16.7307C10.048 16.8755 12.1431 16.1971 13.7765 14.8365L18.4696 19.5306C18.5393 19.6003 18.622 19.6556 18.713 19.6933C18.8041 19.731 18.9017 19.7504 19.0002 19.7504C19.0988 19.7504 19.1963 19.731 19.2874 19.6933C19.3784 19.6556 19.4612 19.6003 19.5308 19.5306C19.6005 19.4609 19.6558 19.3782 19.6935 19.2871C19.7312 19.1961 19.7506 19.0985 19.7506 19C19.7506 18.9014 19.7312 18.8038 19.6935 18.7128C19.6558 18.6218 19.6005 18.539 19.5308 18.4693ZM1.75021 8.49997C1.75021 7.16495 2.14609 5.8599 2.88779 4.74987C3.62949 3.63984 4.6837 2.77467 5.9171 2.26378C7.1505 1.75289 8.5077 1.61922 9.81707 1.87967C11.1264 2.14012 12.3292 2.78299 13.2732 3.727C14.2172 4.671 14.8601 5.87374 15.1205 7.18311C15.381 8.49248 15.2473 9.84968 14.7364 11.0831C14.2255 12.3165 13.3603 13.3707 12.2503 14.1124C11.1403 14.8541 9.83524 15.25 8.50021 15.25C6.71061 15.248 4.99488 14.5362 3.72944 13.2708C2.464 12.0053 1.7522 10.2896 1.75021 8.49997Z"></path>
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="searchText"
              component="div"
              className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminNavbarSearchBox;
