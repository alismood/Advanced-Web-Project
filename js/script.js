$(document).ready(function () {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var currentUser = null;
  var theme = "light";

  // Restore the saved theme and non-sensitive sign-in details.
  try {
    if (localStorage.getItem("recipeShareTheme") == "dark") {
      theme = "dark";
    }
    var savedUser = JSON.parse(localStorage.getItem("recipeShareUser"));
    if (savedUser && typeof savedUser.name == "string" && savedUser.name.trim().length > 0 &&
        savedUser.name.length <= 80 && typeof savedUser.email == "string" && emailPattern.test(savedUser.email)) {
      currentUser = { name: savedUser.name, email: savedUser.email };
    }
  } catch (error) {
    // Start signed out when storage is unavailable or contains invalid data.
  }

  function showStorageError() {
    $("#storage-status").prop("hidden", false).text("Your browser could not save this change. Please allow site storage and try again.");
  }

  function applyTheme() {
    $("html").attr("data-bs-theme", theme);
    $("#theme-toggle").attr("aria-pressed", theme == "dark" ? "true" : "false")
      .text(theme == "dark" ? "Use light theme" : "Use dark theme");
  }

  function updateAccount() {
    var signedIn = currentUser != null;
    $(".signed-in-only").prop("hidden", !signedIn);
    $(".signed-out-only").prop("hidden", signedIn);
    $(".user-name").text(signedIn ? currentUser.name : "");
    $(".user-email").text(signedIn ? currentUser.email : "");
  }

  applyTheme();
  updateAccount();

  $("#theme-toggle").on("click", function () {
    theme = theme == "dark" ? "light" : "dark";
    applyTheme();
    try {
      localStorage.setItem("recipeShareTheme", theme);
      $("#storage-status").prop("hidden", true);
    } catch (error) {
      showStorageError();
    }
  });

  $(".sign-out").on("click", function () {
    try {
      localStorage.removeItem("recipeShareUser");
      currentUser = null;
      updateAccount();
      $("#storage-status").prop("hidden", true);
      $("#sign-in-status").text("You are signed out.");
      if ($("#sign-in-name").length) {
        $("#sign-in-name").trigger("focus");
      } else {
        $(".signed-out-only").first().trigger("focus");
      }
    } catch (error) {
      showStorageError();
    }
  });

  // Open and close the FAQ answers.
  $(".faq-question").on("click", function () {
    var expanded = $(this).attr("aria-expanded") == "true";
    $(this).attr("aria-expanded", expanded ? "false" : "true");
    $(this).find(".faq-indicator").text(expanded ? "+" : "−");
    $("#" + $(this).attr("aria-controls")).stop(true, true).slideToggle(200);
  });

  // Search the existing recipe cards by text and category.
  var selectedCategory = "all";

  function filterRecipes() {
    var search = $("#recipe-search").val().trim().toLowerCase();
    var count = 0;

    $(".recipe-horizontal-card").each(function () {
      var matchesText = $(this).text().toLowerCase().indexOf(search) != -1;
      var matchesCategory = selectedCategory == "all" || $(this).data("category") == selectedCategory;
      var visible = matchesText && matchesCategory;
      $(this).prop("hidden", !visible);
      if (visible) {
        count++;
      }
    });

    $("#recipe-count").text(count + (count == 1 ? " recipe found." : " recipes found."));
    $("#no-recipes").prop("hidden", count != 0);
  }

  $("#recipe-search").on("input", filterRecipes);
  $(".category-filter").on("click", function () {
    selectedCategory = $(this).data("category");
    $(".category-filter").removeClass("btn-danger").addClass("btn-outline-danger").attr("aria-pressed", "false");
    $(this).removeClass("btn-outline-danger").addClass("btn-danger").attr("aria-pressed", "true");
    filterRecipes();
  });

  // Search TheMealDB and display the JSON results.
  $("#online-recipe-form").on("submit", function (event) {
    event.preventDefault();
    var search = $("#online-search").val().trim();
    var status = $("#online-status");
    var results = $("#online-results");
    if (search.length == 0) {
      status.addClass("text-danger").text("Please enter a dish name.");
      $("#online-search").trigger("focus");
      return;
    }

    results.empty().attr("aria-busy", "true");
    status.removeClass("text-danger").text("Loading recipes…");
    $("#online-search-button, #online-search").prop("disabled", true);

    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(search))
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then(function (data) {
        if (data.meals == null || (Array.isArray(data.meals) && data.meals.length == 0)) {
          status.text("No recipes found. Try another dish name.");
          return;
        }
        if (!Array.isArray(data.meals)) {
          throw new Error("Invalid recipe data");
        }
        for (var i = 0; i < data.meals.length; i++) {
          var meal = data.meals[i];
          var card = $("<article>").addClass("online-recipe-card");
          if (typeof meal.strMealThumb == "string" && meal.strMealThumb.indexOf("https://www.themealdb.com/images/") == 0) {
            $("<img>").attr({ src: meal.strMealThumb, alt: meal.strMeal, loading: "lazy" }).appendTo(card);
          }
          var body = $("<div>").addClass("p-3");
          $("<h3>").addClass("h5").text(meal.strMeal).appendTo(body);
          $("<p>").addClass("text-muted").text(meal.strCategory || "Recipe").appendTo(body);
          var details = $("<details>");
          $("<summary>").text("Cooking instructions").appendTo(details);
          $("<p>").addClass("online-instructions mt-2 mb-0").text(meal.strInstructions || "No instructions available.").appendTo(details);
          body.append(details);
          card.append(body);
          results.append(card);
        }
        status.text(data.meals.length + (data.meals.length == 1 ? " recipe found." : " recipes found."));
      })
      .catch(function () {
        results.empty();
        status.addClass("text-danger").text("Could not load recipes. Check your connection and try again.");
      })
      .then(function () {
        results.attr("aria-busy", "false");
        $("#online-search-button, #online-search").prop("disabled", false);
      });
  });

  // Keep table records in an array until the page is reloaded.
  var recipes = [
    { name: "Spaghetti Carbonara", category: "Pasta", minutes: 25 },
    { name: "Healthy Veggie Bowl", category: "Salads", minutes: 30 }
  ];
  var editIndex = -1;

  function renderTable() {
    var body = $("#recipe-table-body");
    body.empty();

    for (var i = 0; i < recipes.length; i++) {
      var row = $("<tr>");
      $("<td>").text(recipes[i].name).appendTo(row);
      $("<td>").text(recipes[i].category).appendTo(row);
      $("<td>").text(recipes[i].minutes).appendTo(row);
      var actions = $("<td>");
      $("<button>").attr({ type: "button", "data-index": i, "aria-label": "Edit " + recipes[i].name })
        .addClass("btn btn-sm btn-outline-secondary edit-recipe me-2").text("Edit").appendTo(actions);
      $("<button>").attr({ type: "button", "data-index": i, "aria-label": "Delete " + recipes[i].name })
        .addClass("btn btn-sm btn-outline-danger delete-recipe").text("Delete").appendTo(actions);
      row.append(actions);
      body.append(row);
    }

    if (recipes.length == 0) {
      body.append($("<tr>").append($("<td>").attr("colspan", "4").text("Your list is empty. Add a recipe above.")));
    }
  }

  function resetRecipeForm() {
    editIndex = -1;
    $("#recipe-form")[0].reset();
    $("#save-recipe").text("Add recipe");
    $("#cancel-edit").prop("hidden", true);
  }

  if ($("#recipe-form").length) {
    renderTable();
  }

  $("#recipe-form").on("submit", function (event) {
    event.preventDefault();
    var name = $("#recipe-name").val().trim();
    var minutes = Number($("#recipe-time").val());
    if (name.length == 0 || minutes < 1 || minutes > 1440 || minutes % 1 != 0) {
      $("#table-status").text("Enter a recipe name and a whole cooking time from 1 to 1440 minutes.");
      return;
    }

    var recipe = { name: name, category: $("#recipe-category").val(), minutes: minutes };
    if (editIndex == -1) {
      recipes.push(recipe);
      $("#table-status").text("Recipe added to your list.");
    } else {
      recipes[editIndex] = recipe;
      $("#table-status").text("Recipe updated.");
    }
    renderTable();
    resetRecipeForm();
  });

  $("#recipe-table-body").on("click", ".edit-recipe", function () {
    editIndex = Number($(this).data("index"));
    $("#recipe-name").val(recipes[editIndex].name).trigger("focus");
    $("#recipe-category").val(recipes[editIndex].category);
    $("#recipe-time").val(recipes[editIndex].minutes);
    $("#save-recipe").text("Save changes");
    $("#cancel-edit").prop("hidden", false);
    $("#table-status").text("Editing " + recipes[editIndex].name + ". Change the fields and save.");
  });

  $("#cancel-edit").on("click", function () {
    resetRecipeForm();
    $("#table-status").text("Edit cancelled.");
  });

  $("#recipe-table-body").on("click", ".delete-recipe", function () {
    var index = Number($(this).data("index"));
    if (window.confirm('Delete "' + recipes[index].name + '" from your list?')) {
      recipes.splice(index, 1);
      if (editIndex == index) {
        resetRecipeForm();
      } else if (editIndex > index) {
        editIndex--;
      }
      renderTable();
      $("#table-status").text("Recipe deleted.");
    }
  });

  // Show text feedback beside each form field.
  function showFeedback(field, valid, message) {
    field.toggleClass("is-invalid", !valid).toggleClass("is-valid", valid);
    field.attr("aria-invalid", valid ? "false" : "true");
    $("#" + field.attr("id") + "-feedback").text(message)
      .toggleClass("text-danger", !valid).toggleClass("text-success", valid);
    return valid;
  }

  function validateField(field) {
    var id = field.attr("id");
    var value = field.val().trim();
    if (value.length == 0) {
      return showFeedback(field, false, "Please fill in this field.");
    }
    if (field.attr("type") == "email" && !emailPattern.test(value)) {
      return showFeedback(field, false, "Enter an email such as name@example.com.");
    }
    if (id == "register-password" && field.val().length < 8) {
      return showFeedback(field, false, "Use at least 8 characters.");
    }
    if (id == "confirm-password" && field.val() != $("#register-password").val()) {
      return showFeedback(field, false, "The passwords do not match.");
    }
    return showFeedback(field, true, "Looks good.");
  }

  function updatePasswordStrength() {
    var password = $("#register-password").val();
    var strength = "weak";
    var hasLetters = /[a-z]/.test(password) && /[A-Z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSymbol = /[^a-zA-Z0-9\s]/.test(password);

    if (password.length >= 8 && (hasLetters || hasNumber || hasSymbol)) {
      strength = "medium";
    }
    if (password.length >= 12 && hasLetters && hasNumber && hasSymbol) {
      strength = "strong";
    }
    var label = "Password strength: " + strength;
    if (password.length == 0) {
      label = "Password strength: not entered";
      strength = "";
    }
    $("#password-strength").removeClass("weak medium strong").addClass(strength).text(label);
  }

  $("#contact-form input, #contact-form textarea, #registration-form input, #sign-in-form input").on("input blur", function () {
    validateField($(this));
    $(this).closest("form").find("[role='status']").not("#password-strength").text("");
    if ($(this).attr("id") == "register-password") {
      updatePasswordStrength();
      if ($("#confirm-password").val().length > 0) {
        validateField($("#confirm-password"));
      }
    }
  });

  $("#contact-form, #registration-form, #sign-in-form").on("submit", function (event) {
    event.preventDefault();
    var valid = true;
    $(this).find("input, textarea").each(function () {
      if (!validateField($(this))) {
        valid = false;
      }
    });
    var status = $(this).find("[role='status']").not("#password-strength");
    status.toggleClass("text-danger", !valid).toggleClass("text-success", valid);
    if (!valid) {
      status.text("Please correct the marked fields.");
      $(this).find(".is-invalid").first().trigger("focus");
      return;
    }
    if ($(this).attr("id") == "sign-in-form") {
      var user = { name: $("#sign-in-name").val().trim(), email: $("#sign-in-email").val().trim() };
      try {
        localStorage.setItem("recipeShareUser", JSON.stringify(user));
        currentUser = user;
        this.reset();
        $(this).find("input").removeClass("is-valid is-invalid").removeAttr("aria-invalid");
        $(this).find(".field-feedback").text("");
        status.text("");
        updateAccount();
        $("#storage-status").prop("hidden", true);
        $("#sign-in-summary").trigger("focus");
      } catch (error) {
        showStorageError();
      }
    } else if ($(this).attr("id") == "registration-form") {
      status.text("Registration details are valid. This demo does not create an account.");
    } else {
      status.text("Your message is valid. This demo does not send email.");
    }
  });

  // Browse the gallery with jQuery fade effects.
  var galleryImages = $(".gallery-link img");
  var imageIndex = 0;
  var lastGalleryLink;

  function setLightboxImage() {
    var photo = galleryImages.eq(imageIndex);
    $("#lightbox-image").attr({ src: photo.attr("src"), alt: photo.attr("alt") });
    $("#lightbox-caption").text(photo.attr("alt"));
    $("#lightbox-count").text((imageIndex + 1) + " / " + galleryImages.length);
  }

  function changeImage(step) {
    imageIndex = (imageIndex + step + galleryImages.length) % galleryImages.length;
    $("#lightbox-image").stop(true, true).fadeOut(120, function () {
      setLightboxImage();
      $(this).fadeIn(120);
    });
  }

  function closeLightbox() {
    $("#lightbox").stop(true, true).fadeOut(180, function () {
      $("body").removeClass("lightbox-open");
      if (lastGalleryLink) {
        lastGalleryLink.focus();
      }
    });
  }

  $(".gallery-link").on("click", function (event) {
    event.preventDefault();
    lastGalleryLink = this;
    imageIndex = $(".gallery-link").index(this);
    setLightboxImage();
    $("body").addClass("lightbox-open");
    $("#lightbox").stop(true, true).fadeIn(180, function () {
      $("#close-lightbox").trigger("focus");
    });
  });
  $("#previous-image").on("click", function () { changeImage(-1); });
  $("#next-image").on("click", function () { changeImage(1); });
  $("#close-lightbox").on("click", closeLightbox);
  $("#lightbox").on("click", function (event) {
    if (event.target == this) {
      closeLightbox();
    }
  });
  $(document).on("keydown", function (event) {
    if (!$("#lightbox").is(":visible")) {
      return;
    }
    if (event.key == "Escape") { closeLightbox(); }
    if (event.key == "ArrowLeft") { changeImage(-1); }
    if (event.key == "ArrowRight") { changeImage(1); }
    if (event.key == "Tab") {
      var first = $("#close-lightbox")[0];
      var last = $("#next-image")[0];
      if (event.shiftKey && (document.activeElement == first || document.activeElement == $("#lightbox")[0])) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement == last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
});
