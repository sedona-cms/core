import Vue, { VNode, PropType } from 'vue'
import ItemTaberror from './item-tab-error'
import ItemTabLoading from './item-tab-loading'

const getTabComponent: (componentPath: string) => any = (componentPath: string) => ({
    component: import(`~/admin/${ componentPath }`),
    loading: ItemTabLoading,
    error: ItemTaberror,
    timeout: 600,
})

export default Vue.extend({
    name: 'ItemTabContainer',
    props: {
        title: {
            type: String,
            default: '',
        },
        subTitle: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: 'folder',
        },
        component: {
            type: [ String, Function, Object ],
            required: true,
            validator: (value) => value !== '',
        },
        items: {
            type: Array,
            default: () => [],
        },
        params: {
            type: Object,
            default: () => {
            },
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
        const viewProps = {
            items: this.items,
        }
        let view
        switch (typeof this.component) {
            case 'string':
                view = h(this.asyncComponent, { props: this.params })
                break
            case 'function':
                view = h(this.component, { props: viewProps })
                break
            case 'object':
                view = this.component
                break
        }

        // home tab
        if (this.title === '') {
            return <div class="fit">{ view }</div>
        }

        return (
            <div class="fit">
                <q-toolbar inset={ false }>
                    <q-btn flat={ true } round={ true } dense={ true } icon={ this.icon }
                           on-click={ this.$sedona.goBack }/>
                    <q-toolbar-title shrink={ true }>{ this.title }</q-toolbar-title>
                </q-toolbar>
                <q-separator dark={ true } horizontal={ true } inset={ false }/>
                { view }
            </div>
        )
    },
})
