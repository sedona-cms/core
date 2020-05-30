import VuePlugin from 'quasar/src/vue-plugin'

import { QToolbar, QToolbarTitle } from 'quasar/src/components/toolbar'
import { QSpace } from 'quasar/src/components/space'
import { QBtn } from 'quasar/src/components/btn'
import { QBtnDropdown } from 'quasar/src/components/btn-dropdown'
import { QBtnGroup } from 'quasar/src/components/btn-group'
import { QIcon } from 'quasar/src/components/icon'

import { QTabPanel, QTabPanels } from 'quasar/src/components/tab-panels'
import { QTabs, QTab } from 'quasar/src/components/tabs'

import { QList, QItem, QItemSection, QItemLabel } from 'quasar/src/components/item'
import { QExpansionItem } from 'quasar/src/components/expansion-item'
import { QAvatar } from 'quasar/src/components/avatar'
import { QSeparator } from 'quasar/src/components/separator'
import { QTooltip } from 'quasar/src/components/tooltip'

import { QPagination } from 'quasar/src/components/pagination'

import { QCard, QCardSection, QCardActions } from 'quasar/src/components/card'
import { QSkeleton } from 'quasar/src/components/skeleton'

import { QImg } from 'quasar/src/components/img'
import { QVideo } from 'quasar/src/components/video'
import { QUploader } from 'quasar/src/components/uploader'

import { QInput } from 'quasar/src/components/input'
import { QCheckbox } from 'quasar/src/components/checkbox'
import { QField } from 'quasar/src/components/field'
import { QDate } from 'quasar/src/components/date'
import { QEditor } from 'quasar/src/components/editor'
import { QSelect } from 'quasar/src/components/select'

import { QCircularProgress } from 'quasar/src/components/circular-progress'
import { QMenu } from 'quasar/src/components/menu'
import { QOptionGroup } from 'quasar/src/components/option-group'

import { QScrollArea } from 'quasar/src/components/scroll-area'

import * as directives from 'quasar/src/directives'

export default {
  ...VuePlugin,
  install(Vue) {
    VuePlugin.install(Vue, {
      components: {
        QToolbar,
        QToolbarTitle,
        QSpace,
        QBtn,
        QBtnDropdown,
        QIcon,
        QTabPanel,
        QTabPanels,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QExpansionItem,
        QAvatar,
        QSeparator,
        QTooltip,
        QCard,
        QCardSection,
        QCardActions,
        QInput,
        QCheckbox,
        QDate,
        QEditor,
        QCircularProgress,
        QMenu,
        QOptionGroup,
        QField,
        QScrollArea,
        QImg,
        QVideo,
        QUploader,
        QPagination,
        QSelect,
        QSkeleton,
        QTabs,
        QTab,
        QBtnGroup,
      },
      directives,
      plugins: {},
    })
  },
}
