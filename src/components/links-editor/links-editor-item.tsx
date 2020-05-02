import Vue, { VNode, PropType } from 'vue'

export default Vue.extend({
  name: 'LinksEditorItem',
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
    href: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      showRemoveConfirm: false as boolean,
    }
  },
  methods: {
    removeCancelClick(event: Event): void {
      event.stopPropagation()
      this.showRemoveConfirm = false
    },
    removeOkClick(event: Event): void {
      event.stopPropagation()
      this.$emit('remove', { id: this.id })
    },
  },
  render(): VNode {
    /// Block item confirm

    const removeConfirm = (
      <div class={['fit', 'row', 'q-gutter-x-sm', 'justify-center']}>
        <q-btn label="Cancel" dense={false} outline={true} on-click={this.removeCancelClick} />
        <q-btn label="Remove" dense={false} color="negative" on-click={this.removeOkClick} />
      </div>
    )

    /// Block item

    const headerItemIcon = (
      <q-item-section avatar={true}>
        <q-avatar icon="menu" textColor="white" />
      </q-item-section>
    )

    // Block item title with sub title

    const headerItemTitle = (
      <q-item-section>
        <q-item-label>{this.title}</q-item-label>
        <q-item-label caption={true} lines={2}>
          {this.href}
        </q-item-label>
      </q-item-section>
    )

    return (
      <q-expansion-item
        ref="menuItem"
        class={['bg-grey-8', 'text-white']}
        default-opened={true}
        dense-toggle={false}
        scopedSlots={{
          header: () => [
            ...(this.showRemoveConfirm ? [removeConfirm] : [headerItemIcon, headerItemTitle]),
          ],
        }}>
        <q-card className="bg-grey-9" flat={true} dark={true}>
          <div class="q-gutter-md">
            <q-input
              outlined={true}
              dark={true}
              value={this.title}
              label="Title"
              class="q-pt-md q-pl-md q-pr-md"
              on-input={value => this.$emit('change', { id: this.id, field: 'title', value })}
            />
            <q-input
              outlined={true}
              dark={true}
              value={this.href}
              label="Href"
              class="q-pt-sm q-pl-md q-pr-md q-pb-md"
              on-input={value => this.$emit('change', { id: this.id, field: 'href', value })}
            />
          </div>
        </q-card>
      </q-expansion-item>
    )
  },
})
