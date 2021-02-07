$(document).ready(function () {
  $(".delete-recipe").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/recipes/" + id,
      success: function (response) {},
      error: function (error) {
        console.log(error);
      },
    });
  });
});
