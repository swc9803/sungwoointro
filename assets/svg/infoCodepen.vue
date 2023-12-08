<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="none"
    viewBox="0 0 50 50"
  >
    <path
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2.3"
      d="M2 32.736 25 48M2 32.736V17.264m0 15.472 23-15.472M25 48l23-15.264M25 48V32.736m23 0V17.264m0 15.472L25 17.264m23 0L25 2m23 15.264L25 32.527 2 17.264M25 2 2 17.264M25 2v15.264"
    />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    scale: 1.2;
  }
}
</style>
