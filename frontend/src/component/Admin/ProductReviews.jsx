import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metadata from "../layout/Metadata";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <>
            {params.row.rating >= "rating" ? (
              <span className="green">{params.row.rating}</span>
            ) : (
              <span className="red">{params.row.rating}</span>
            )}
          </>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteIcon classes={{ root: "custom-edit-icon" }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <Metadata title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <form
            className="createProductForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1>ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Name"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Update
            </Button>
          </form>

          <div
            className="bg-white rounded-xl shadow-lg w-full"
            style={{ height: 700 }}
          >
            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectIconOnClick
                sx={{
                  boxShadow: 0,
                  border: 0,
                }}
              />
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
