<template>
  <div class="q-pa-md q-gutter-md">
    <p class="text-h5 q-pl-md q-pt-md q-pb-none">Images</p>

    <template v-for="src in images">
      <image-card :key="generateId()" :src="src" title="Image Title" />
    </template>

    <p class="text-h5 q-pl-md q-pt-md q-pb-none">Image without title</p>

    <image-card src="https://placeimg.com/500/300/nature" />

    <p class="text-h5 q-pl-md q-pt-md q-pb-none">Image with custom toolbar</p>

    <image-card src="https://placeimg.com/500/300/nature" title="Image Title">
      <template v-slot:toolbar>
        <div class="q-pa-sm">
          <q-btn label="Mark as thumb" color="primary" />
        </div>
      </template>
    </image-card>

    <p class="text-h5 q-pl-md q-pt-md q-pb-none">Videos</p>

    <template v-for="src in videos">
      <video-card :key="generateId()" :src="src" />
    </template>

    <p class="text-h5 q-pl-md q-pt-md q-pb-none">Video with custom toolbar</p>

    <video-card src="https://www.youtube.com/embed/N6mrt4vuNEY">
      <template v-slot:toolbar>
        <div class="q-pa-sm">
          <q-btn icon="low_priority" color="primary" round dense>
            <q-tooltip>Move to...</q-tooltip>
          </q-btn>
        </div>
      </template>
    </video-card>
  </div>
</template>

<script>
  import { ImageCard, VideoCard } from '@sedona-cms/core/lib/components'
  import { generateId } from '@sedona-cms/core/lib/utils/nanoid'

  const images = [
    `https://placeimg.com/500/300/nature?t=${Math.random()}`,
    `https://placeimg.com/500/300/nature?t=${Math.random()}`,
    `https://placeimg.com/500/300/nature?t=${Math.random()}`,
    `https://placeimg.com/500/300/nature?t=${Math.random()}`,
  ]

  const videos = [
    'https://www.youtube.com/embed/N6mrt4vuNEY',
    'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
  ]

  export default {
    name: 'MediaCardView',
    components: {
      ImageCard,
      VideoCard,
    },
    data() {
      return {
        images,
        videos,
      }
    },
    methods: {
      generateId,
    },
  }
</script>
