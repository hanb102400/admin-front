<template>
<div>
    <el-table  :data="tableData" style="width: 100%" stripe border>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10" :page-sizes="[5, 10, 15, 20]" :current-page="pageNo" :total="totalCount">
    </el-pagination>
</div>
</template>

<script>
module.exports = {
    methods: {
        handleSizeChange: function (val) {
            this.pagesize = val;
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.handlePageData(currentPage);
        },
        handlePageData(pageNo) {
            var that = this;
            var params = {
                "page": pageNo
            };
            axios.get('/user/list?page='+pageNo, params) //"url"处填写后台的接口
                .then(resp => {
                    var re = resp.data
                    console.log("this.tableData", re)
                    if (re && re.code == 0) {
                        console.log("this.tableData", this.tableData)
                        this.tableData = re.data;
                    }
                }).catch(error => { // 请求失败
                    console.log('请求失败');
                    console.log(error);
                })
        }
    },
    data() {
        return {
            totalCount: 100,
            totalPage: 10,
            pageNo: 1,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted() {
        console.log("/user/list")
        this.handlePageData(1)
    }

}
</script>
