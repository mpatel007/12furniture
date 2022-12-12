import react, { useState, useEffect } from "react";
import SubCategory from "../../View/admin/Category/SubCategory/SubCategory";
import SubCategoryForm from "../../View/admin/Category/SubCategory/SubCategoryForm";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import { useParams } from "react-router-dom";

import categoryApi from "../../Api/admin/category";
import { confirmAlert } from "react-confirm-alert";

function SubCatagoryController() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [subcategory, setsubcategory] = useState([]);
  const [update, setUpdate] = useState(false);
  var adminAuthToken = localStorage.getItem("adminAuthToken");
  const [categoryName, setcategoryName] = useState("")
  const [expand, setExpand] = useState(false)
  // const [categoryName, setcategoryName] = useState("");

  const params = useParams();
  let category_id = params.id;
  const [state, setstate] = useState({
    id: "",
    subcategoryName: "",
    status: 1,
    error: [],
    errids: [],
  });

  const { subcategoryName, status, error, errids, id } = state;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const SubcategoryList = await categoryApi.SubcategoryList(
        adminAuthToken,
        category_id
      );
      if (SubcategoryList.data.status == 1) {
        setcategoryName(SubcategoryList.data.categoryData.length ? SubcategoryList.data.categoryData[0].name : "")
        setsubcategory(SubcategoryList.data.data);
      }
      setLoading(false);
    })();
  }, [update]);

  const addSubcategory = () => {
    const emaptyvalKey = [];

    // console.log(emaptyvalKey)

    const rules = {
      subcategoryName: "required",
    };
    const message = {
      "subcategoryName.required": "Subcategory name is Requied.",
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};

        setstate({
          ...state,
          error: formaerrror,
        });

        setLoading(true);
        const addSubcategory = await categoryApi.addSubcategory(
          adminAuthToken,
          category_id,
          subcategoryName,
          status
        );

        if (addSubcategory) {
          if (addSubcategory.data.status == 0) {
            setLoading(false);
            ToastAlert({ msg: addSubcategory.data.message, msgType: "error" });
          } else {
            setLoading(false);
            setUpdate(!update);
            ToastAlert({
              msg: addSubcategory.data.message,
              msgType: "success",
            });
            setModal(false);
            setstate({
              ...state,
              subcategoryName: "",
            });
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: "Something went wrong", msgType: "error" });
        }
      })
      .catch((errors) => {
        setLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: "Something went wrong", msgType: "error" });
        }

        setstate({
          ...state,
          error: formaerrror,
        });
      });
  };
  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value,
    });
  };

  const onOpenModal = () => {
    setstate({
      ...state,
      id: "",
      subcategoryName: "",
      error: [],
    });

    setModal(true);
  };

  const deleteSubcategory = (id) => {
    confirmAlert({
      title: "Delete subcategory",
      message: "Are you sure to do this ?",
      buttons: [
        {
          label: "Yes",

          onClick: async () => {
            setLoading(true);
            const deleteSubcategory = await categoryApi.deleteSubcategory(
              adminAuthToken,
              id
            );
            if (deleteSubcategory) {
              if (deleteSubcategory.data.status == 0) {
                setLoading(false);
                ToastAlert({
                  msg: deleteSubcategory.data.message,
                  msgType: "error",
                });
              } else {
                setLoading(false);
                setUpdate(!update);
                ToastAlert({
                  msg: deleteSubcategory.data.message,
                  msgType: "success",
                });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: "Something went wrong", msgType: "error" });
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const editSubcategory = (data) => {
    setModal(true);

    setstate({
      ...state,
      id: data.id,
      subcategoryName: data.name,
      status: data.status,
    });
  };

  const updateSubcategory = async () => {
    const rules = {
      subcategoryName: "required",
    };
    const message = {
      "subcategoryName.required": "Subcategory name is Requied.",
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};

        setstate({
          ...state,
          error: formaerrror,
        });
        const updateSubcategory = await categoryApi.updateSubcategory(
          adminAuthToken,
          id,
          subcategoryName,
          status
         
        );
        if (updateSubcategory) {
          if (updateSubcategory.data.status == 0) {
            setLoading(false);
            ToastAlert({ msg: updateSubcategory.data.message, msgType: "error" });
          } else {
            setLoading(false);
            setUpdate(!update);
            setModal(false);
            setstate({
              ...state,
              subcategoryName: "",
              status: 1,
            });

            ToastAlert({ msg: updateSubcategory.data.message, msgType: "success" });
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: "Something went wrong", msgType: "error" });
        }
      })
      .catch((errors) => {
        setLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: "Something went wrong", msgType: "error" });
        }

        setstate({
          ...state,
          error: formaerrror,
        });
      });
  };

  return (
    <>
      <PageLoader loading={loading} />
      <SubCategoryForm
        modal={modal}
        setModal={setModal}
        addSubcategory={addSubcategory}
        stateData={state}
        changevalue={changevalue}
        updateSubcategory={updateSubcategory}
      />
      <SubCategory
        setModal={setModal}
        categoryName={categoryName}
        expand={expand}
        setExpand={setExpand}
        subcategory={subcategory}
        deleteSubcategory={deleteSubcategory}
        editSubcategory={editSubcategory}
        onOpenModal={onOpenModal}
      />
    </>
  );
}

export default SubCatagoryController;
