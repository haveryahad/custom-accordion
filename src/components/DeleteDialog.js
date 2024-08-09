import cross from "../assets/grey-cross.svg";

const DeleteDialog = ({
  isDeleteConfirmed,
  handleDeleteConfirm,
  handleCancelDelete,
}) => {
  const confirmDelete = () => {
    handleDeleteConfirm(isDeleteConfirmed.id);
  };
  const cancelDelete = () => {
    handleCancelDelete();
  };
  return (
    <div className="px-2 pb-4 border rounded-lg fixed top-1/2 left-1/2 bg-white w-[500px] -translate-x-1/2 -translate-y-1/2 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="p-1">Are you sure you want to delete?</div>
        <div className="p-1 cursor-pointer">
          <img
            src={cross}
            alt="X"
            onClick={cancelDelete}
          />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div
          className="px-6 py-2 mx-1 border rounded-2xl text-sm cursor-pointer"
          onClick={cancelDelete}
        >
          Cancel
        </div>
        <div
          className="px-6 py-2 mx-1 border rounded-2xl cursor-pointer text-sm text text-white bg-[#ff3500]"
          onClick={confirmDelete}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
