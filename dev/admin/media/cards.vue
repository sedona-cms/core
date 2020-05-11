<template>
  <div class="q-pa-md q-gutter-md">
    <image-card title="Image Title">
      <template v-slot:toolbar>
        <div class="q-pa-sm">
          <q-btn label="Mark as thumb" color="primary" />
        </div>
      </template>
    </image-card>

    <image-card title="Image Title" />

    <video-card src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />

    <video-card
      src="https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
    />

    <image-card title="Image Title" />

    <image-card title="Image Title" />

    <image-card title="Image Title" />

    <image-card title="Image Title" />
  </div>
</template>

<script>
  import { ImageCard, VideoCard } from '@sedona-cms/core/lib/components'

  export default {
    name: 'MediaCardView',
    components: {
      ImageCard,
      VideoCard,
    },
  }
</script>
