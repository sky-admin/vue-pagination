<template>
    <div id="pagination-container">
        <div class="page-main">
            <button v-if="getPageModel.hasPre" @click="changePage(getPageModel.currentPage-1)">
                上一页
            </button>
            <button v-if="getPageModel.hasFirst" @click="changePage(1)">
                1
            </button>
            <span v-if="getPageModel.hasFirst">…</span>
            <button v-for="pageNumber in getPageModel.pages" :class="pageNumber==getPageModel.currentPage?'current-page':''" @click="changePage(pageNumber)">
                {{pageNumber}}
            </button>
            <span v-if="getPageModel.hasLast">…</span>
            <button v-if="getPageModel.hasLast" @click="changePage(getPageModel.lastPage)">
                {{totalPage}}
            </button>
            <button v-if="getPageModel.hasNext" @click="changePage(getPageModel.currentPage+1)">
                下一页
            </button>
        </div>
    </div>
</template>

<script>
    import Page from './page';
    export default{
        data() {
            return {
                page: null,
                pageModel: {

                }
            };
        },
        props: {
            currentPage: {
                type: Number,
                default: 1,
                require: true
            },
            totalPage: {
                type: Number,
                default: 1,
                require: true
            }
        },
        computed: {
            getPageModel() {
                return Page({
                    pages: this.totalPage, // 通过后台拿到的总页数
                    curr: this.currentPage, // 当前页
                    last: this.totalPage
                });
            }
        },
        ready() {},
        methods: {
            changePage(newPage) {
                if (newPage !== this.currentPage) {
                    this.$dispatch('changePage', newPage);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-main {
        margin-right: 40px;
        text-align: right;

        .current-page {
            border: none;
            background: none;
        }

        button {
            outline: none;
        }
    }

    .page-main a,
    .page-main input,
    .page-main span {
        height: 26px;
        line-height: 26px;
    }

    .page-main button,
    .page-main input,
    .page-main a {
        border: 1px solid #ccc;
        background-color: #fff;
    }

    .page-main {
        clear: both;
        font-size: 0;
        color: #666;
    }

    .page-main * {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
    }

    .page-main a {
        text-decoration: none;
        color: #666;
    }

    .page-main a,
    .page-main span {
        margin: 0 3px 6px;
        padding: 0 10px;
    }

    .page-main input {
        width: 40px;
        margin: 0 5px;
        padding: 0 5px;
    }

    .page-main button {
        height: 28px;
        margin-left: 5px;
        padding: 0 10px;
        line-height: 28px;
        color: #666;
    }

    .page-main span {
        height: 28px;
        line-height: 28px;
        color: #999;
    }

    .page-main .page-curr {
        font-weight: 700;
        color: #666;
    }

    .pageskin-molv a,
    .pageskin-molv span {
        padding: 0 12px;
        border-radius: 2px;
    }

    .pageskin-molv a {
        background-color: #f1eff0;
    }

    .pageskin-molv .page-curr {
        color: #fff;
        background-color: #00aa91;
    }

    .pageskin-molv input {
        height: 24px;
        line-height: 24px;
    }

    .pageskin-molv button {
        height: 26px;
        line-height: 26px;
    }

    .pageskin-yahei {
        color: #333;
    }

    .pageskin-yahei a,
    .pageskin-yahei span {
        padding: 0 13px;
        color: #333;
        border-radius: 2px;
    }

    .pageskin-yahei .page-curr {
        color: #fff;
        background-color: #333;
    }

    .pageskin-flow {
        text-align: center;
    }

    .pageskin-flow .page-nomore {
        color: #999;
    }
</style>