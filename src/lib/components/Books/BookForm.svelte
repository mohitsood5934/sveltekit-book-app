<script>
  import { error } from "@sveltejs/kit";
  export let form;
</script>

<form enctype="multipart/form-data" method="POST">
  <div class="mb-3">
    <label for="title" class="form-label">Book Title</label>
    <input
      type="text"
      name="title"
      class="form-control is-invalid"
      id="title"
      value={form?.title || ""}
      placeholder="Book Title"
      class:is-invalid={form?.error_title}
    />
    {#if form && form.error_title}
      <div class="invalid-feedback">{form?.error_title}</div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="author" class="form-label">Author</label>
    <input
      type="text"
      name="author"
      class="form-control"
      id="author"
      placeholder="Author"
      value={form?.author || ""}
      class:is-invalid={form?.error_author}
    />
    {#if form && form.error_author}
      <div class="invalid-feedback">{form?.error_author}</div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="short_description" class="form-label">Short Description</label>
    <input
      type="text"
      name="short_description"
      class="form-control"
      id="short_description"
      placeholder="Enter short description"
      value={form?.short_description || ""}
      class:is-invalid={form?.error_short_description}
    />
    {#if form && form.error_short_description}
      <div class="invalid-feedback">{form?.error_short_description}</div>
    {/if}
  </div>
  <div class="mb-3">
    <label class="form-label" for="description">Description</label>
    <textarea
      class="form-control"
      placeholder="Book Description here"
      id="description"
      name="description"
      style="height: 100px"
      value={form?.description || ""}
      class:is-invalid={form?.error_description}
    />
    {#if form && form.error_description}
      <div class="invalid-feedback">{form?.error_description}</div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="main_picture" class="form-label">Main Book Picture</label>
    <input
      class="form-control form-control-lg"
      id="main_picture"
      accept="image/*"
      name="main_picture"
      type="file"
      class:is-invalid={form?.error_main_picture}
    />
    {#if form && form.error_main_picture}
      <div class="invalid-feedback">{form?.error_main_picture}</div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="small_picture" class="form-label">Small Book Picture</label>
    <input
      class="form-control form-control-lg"
      id="small_picture"
      accept="image/*"
      name="small_picture"
      type="file"
      class:is-invalid={form?.error_small_picture}
    />
    {#if form && form.error_small_picture}
      <div class="invalid-feedback">{form?.error_small_picture}</div>
    {/if}
  </div>
  <button type="submit" class="btn btn-primary w-100">Submit</button>
</form>
