import Vue, { VNode, PropType } from 'vue'
import AdminItemTabError from './item-tab-error'
import ItemTabLoading from './item-tab-loading'

const getTabComponent: (componentPath: string) => any = (componentPath: string) => ({
  component: import(`~/admin/${componentPath}`),
  loading: ItemTabLoading,
  error: AdminItemTabError,
})

export default Vue.extend({
  name: 'ItemTabContainer',
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    component: {
      type: [String, Function, Object],
      required: true,
      validator: value => value !== '',
    },
    items: {
      type: Array as PropType<MenuItem[]>,
    },
    params: {
      type: Object as PropType<{ [key: string]: any }>,
    },
  },
  data() {
    return {
      asyncComponent: undefined as any,
    }
  },
  created(): void {
    if (typeof this.component === 'string') {
      this.asyncComponent = () => getTabComponent(this.component)
    }
  },
  render(h): VNode {
    const viewProperties = {
      items: this?.items || [],
    }
    let view
    switch (typeof this.component) {
      case 'string':
        view = h(this.asyncComponent, { props: this?.params || {} })
        break
      case 'function':
        view = h(this.component, { props: viewProperties })
        break
      case 'object':
        view = this.component
        break
    }

    // home tab
    if (this.title === '') {
      return <div class="fit">{view}</div>
    }

    return (
      <div class="fit">
        <q-toolbar inset={false}>
          <q-btn flat={true} round={true} dense={true} icon={this.icon} />
          <q-toolbar-title shrink={true}>{this.title}</q-toolbar-title>
        </q-toolbar>
        <q-separator dark={true} horizontal={true} inset={false} />
        {view}
      </div>
    )
  },
})
