import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteFood = ({ id }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isError, mutateAsync } = useMutation({
    mutationFn: () =>
      axios.delete(`/delete-food/${id}`).then((res) => res.data),
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await mutateAsync();
    if (isLoading) toast.loading("Deleting Food");
    if (isError) toast.error(error.message);
    if (data) {
      toast.success("Food deleted successfully");
      document.getElementById("delete-" + id).close();
      queryClient.invalidateQueries({
        queryKey: ["manage-my-foods"],
      });
    }
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-error btn-sm"
        onClick={() => document.getElementById("delete-" + id).showModal()}
      >
        Delete
      </button>
      <dialog id={"delete-" + id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Are you sure want to delete?</h3>
          <button className="btn btn-error m-5" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DeleteFood;
