# vue-simple-pagination

> 一个简单的Vue分页组件

## Usage

### install
`npm i vue-sample-pagination -S`

### import
```js
import vPage from 'vue-sample-pagination'
import 'vue-sample-pagination/dist/vue-pagination.min.css'
```

### use
```vue
// in template
<v-page :current-page="currentPage" :total-page="totalPage" @change-page="changePage"></v-page>

// in script
    data () {
      return {
        currentPage: 0,
        totalPage: 10
      }
    },
    methods: {
      changePage (newPage) {
        this.currentPage = newPage
      }
    }
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
