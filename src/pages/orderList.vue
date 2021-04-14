<template>
  <div class="orderList">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span class="tipClass">请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="content">
      <div class="order_item" v-for="(item, index) in list" :key="index">
        <div class="item_tilte">
          <div class="title_left">
            <span>{{ item.createTime }}</span>
            <span>|</span>
            <span> {{ item.receiverName }}</span>
            <span> 订单号：{{ item.orderNo }}</span>
            <span>|</span>
            <span> 在线支付</span>
          </div>
          <div class="title_right">
            <span
              >应付金额:
              <h1>{{ item.payment }}</h1>
              元</span
            >
          </div>
        </div>
        <div
          class="item_product"
          v-for="(item2, index) in item.orderItemVoList"
          :key="index"
        >
          <div class="prodcut_left">
            <img :src="item2.productImage" />
            <div class="prodcut_Name">
              <p>{{ item2.productName }}</p>
              <p>{{ item2.totalPrice }}元 X{{ item2.quantity }}</p>
            </div>
          </div>
          <div class="prodcut_right" v-if="item.status == 20">
            <span>{{ item.statusDesc }}</span>
          </div>
          <div class="prodcut_right" v-else>
            <span @click="goPay(item.orderNo)">{{ item.statusDesc }}</span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
      <div class="order_moer" v-if="false">
        <el-button
          type="primary"
          @click="Load_more()"
          :loading="loading"
          class="but"
          >加载更多</el-button
        >
      </div>
      <div
        v-if="false"
        class="scroll-more"
        v-infinite-scroll="scrollMore"
        infinite-scroll-disabled="true"
        infinite-scroll-distance="410"
      ></div>
    </div>
    <no-Data v-if="list.length == 0"></no-Data>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import NoData from "@/pages/NoData.vue";
import OrderHeader from "@/components/OrderHeader.vue";
export default {
  name: "orderList",
  components: {
    OrderHeader,
    NoData,
  },
  directives: { infiniteScroll },
  props: {},
  data() {
    return {
      list: [],
      total: 0, //数据总条数
      pageSize: 10, //每页展示的数据条数
      currentPage4: 1,
      pageNum: 1,
      loading: false, //点击加载更多
      busy: false, //滚动加载,是否触发
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOrderList();
  },
  methods: {
    //页码发生改变
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },

    getOrderList() {
      this.busy = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 2,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.busy = false;
          this.loading = false;
          this.total = res.total;
          this.list = res.list.concat(res.list);
          // console.log(res.list);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //去支付
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },
    //加载更多
    Load_more() {
      this.loading = true;
      this.pageNum++;
      this.getOrderList();
    },
    //滚动加载,通过npm插件实现
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 5000);
    },
    //专门给scollMore使用
    getList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.list = res.list.concat(res.list);
          this.busy = false;

          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/config.less";
@import "@/css/base.less";
@import "@/css/globle.less";

.Order {
  .tipClass {
    font-size: 16px;
    color: #666;
  }
}
.orderList {
  .content {
    width: 1226px;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    .order_item {
      width: 100%;
      border: 1px solid #d7d7d7;
      margin-top: 33px;
      .item_tilte {
        padding: 0 43px;
        height: 74px;
        line-height: 74px;
        background-color: #fffaf7;
        font-size: 16px;
        color: #666;
        display: flex;
        justify-content: space-between;
        .title_left {
          span {
            margin-right: 9px;
          }
        }
        .title_right {
          span {
            font-size: 18px;
          }
          h1 {
            display: inline-block;
            margin: 0;
            font-size: 26px;
            color: black;
          }
        }
      }
      .item_product {
        display: flex;
        align-items: center;
        .prodcut_left {
          align-items: center;
          text-align: left;
          width: 90%;
          height: 145px;
          vertical-align: middle;
          display: flex;
          // ;
          img {
            width: 112px;
            height: 77px;
            padding: 0 25px;
          }
          p {
            font-size: 20px;
            color: #333;
            margin: 0;
            padding: 0;
          }
        }
        .prodcut_right {
          span {
            font-size: 20px;
            color: #f60;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.el-pagination {
  text-align: right;
}
.order_moer {
  margin-top: 10px;
  text-align: center;
  .but {
    width: 140px;
    height: 40px;
    border: 1px solid #ff6600;
    background-color: #ff6600;
  }
}
</style>
