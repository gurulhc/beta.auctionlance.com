<template>
  <span class="spinner">
    <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg
      :width="size"
      :height="size"
      :stroke="color"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fill-rule="evenodd">
        <g :stroke-width="strokeWidth" transform="translate(1 1)">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  </span>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: '#fff'
    },
    strokeWidth: {
      type: Number,
      default: 5
    }
  }
}
</script>
<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
