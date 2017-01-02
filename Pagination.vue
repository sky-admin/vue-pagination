<template>
    <div id="pagination-container">
        <div class="nuomipage-main">
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
    import Page from '../../static/js/page';
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
    .nuomipage-main {
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

    .nuomipage-main a,
    .nuomipage-main input,
    .nuomipage-main span {
        height: 26px;
        line-height: 26px;
    }

    .nuomipage-main button,
    .nuomipage-main input,
    .nuomipage-main a {
        border: 1px solid #ccc;
        background-color: #fff;
    }

    .nuomipage-main {
        clear: both;
        font-size: 0;
        color: #666;
    }

    .nuomipage-main * {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
    }

    .nuomipage-main a {
        text-decoration: none;
        color: #666;
    }

    .nuomipage-main a,
    .nuomipage-main span {
        margin: 0 3px 6px;
        padding: 0 10px;
    }

    .nuomipage-main input {
        width: 40px;
        margin: 0 5px;
        padding: 0 5px;
    }

    .nuomipage-main button {
        height: 28px;
        margin-left: 5px;
        padding: 0 10px;
        line-height: 28px;
        color: #666;
    }

    .nuomipage-main span {
        height: 28px;
        line-height: 28px;
        color: #999;
    }

    .nuomipage-main .nuomipage-curr {
        font-weight: 700;
        color: #666;
    }

    .nuomipageskin-molv a,
    .nuomipageskin-molv span {
        padding: 0 12px;
        border-radius: 2px;
    }

    .nuomipageskin-molv a {
        background-color: #f1eff0;
    }

    .nuomipageskin-molv .nuomipage-curr {
        color: #fff;
        background-color: #00aa91;
    }

    .nuomipageskin-molv input {
        height: 24px;
        line-height: 24px;
    }

    .nuomipageskin-molv button {
        height: 26px;
        line-height: 26px;
    }

    .nuomipageskin-yahei {
        color: #333;
    }

    .nuomipageskin-yahei a,
    .nuomipageskin-yahei span {
        padding: 0 13px;
        color: #333;
        border-radius: 2px;
    }

    .nuomipageskin-yahei .nuomipage-curr {
        color: #fff;
        background-color: #333;
    }

    .nuomipageskin-flow {
        text-align: center;
    }

    .nuomipageskin-flow .page-nomore {
        color: #999;
    }
</style>