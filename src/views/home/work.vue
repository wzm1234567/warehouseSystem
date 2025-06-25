<template>
  <div style="width: 100%">
    <div class="header">
      <div>
        <div class="header1">
          <p>本月总收入</p>
          <h2>￥ 28425.00</h2>
          <span>自上月收入 上涨20.5%</span>
        </div>
        <div class="header1-img"></div>
      </div>
      <div>本月总出库</div>
      <div>本月总入库</div>
      <div>本月总运送订单</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // 提取表格数据
    // this.$nextTick(() => {
    //   /***"海滨街2024年8月无丧葬补助居民丧葬补贴发放人员公示表"  */
    //   function extractTableData1() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable1");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年8月无丧葬补助居民丧葬补贴发放人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         deathName: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData1 = extractTableData1();
    //   // tableData.splice(0, 1);
    //   console.log(tableData1,1);



    //   /****"海滨街远景一村2024年8月无丧葬补助居民丧葬补贴发放人员公示表				" */
    //   function extractTableData2() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable2");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年8月无丧葬补助居民丧葬补贴发放人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         deathName: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData2 = extractTableData2();
    //   // tableData.splice(0, 1);
    //   console.log(tableData2,2);




    //   /****"海滨街炼盛社区2024年8月无丧葬补助居民丧葬补贴发放人员公示表				" */
    //   function extractTableData3() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable3");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街炼盛社区2024年8月无丧葬补助居民丧葬补贴发放人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         deathName: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData3 = extractTableData3();
    //   // tableData.splice(0, 1);
    //   console.log(tableData3,3);




    //   /****""海滨街联盟村2024年8月无丧葬补助居民丧葬补贴发放人员公示表				"				" */
    //   function extractTableData4() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable4");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街联盟村2024年8月无丧葬补助居民丧葬补贴发放人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         deathName: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData4 = extractTableData4();
    //   // tableData.splice(0, 1);
    //   console.log(tableData4,4);




    //   /***"芳华社区2024年9月实物救助人员公示表			" */
    //   function extractTableData5() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable5");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "芳华社区2024年9月实物救助人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         ownerName: cells[1].textContent.trim(),
    //         population: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData5 = extractTableData5();
    //   // tableData.splice(0, 1);
    //   console.log(tableData5,5);




    //   /***海滨街安泰社区2024年9月困境家庭儿童基本生活费人员公示表 */
    //   function extractTableData6() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable6");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "芳华社区2024年9月实物救助人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         name: cells[1].textContent.trim(),
    //         price: cells[2].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData6 = extractTableData6();
    //   // tableData.splice(0, 1);
    //   console.log(tableData6,6);




    //   /***安泰居委会2024年9月实物救助人员公示表 */
    //   function extractTableData7() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable7");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "安泰居委会2024年9月实物救助人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         ownerName: cells[1].textContent.trim(),
    //         population: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData7 = extractTableData7();
    //   // tableData.splice(0, 1);
    //   console.log(tableData7,7);




    //   /***幸福居委会2024年9月实物救助公示表 */
    //   function extractTableData8() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable8");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "幸福居委会2024年9月实物救助公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         ownerName: cells[1].textContent.trim(),
    //         population: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData8 = extractTableData8();
    //   // tableData.splice(0, 1);
    //   console.log(tableData8,8);




    //   /**海滨街2024年9月困难人员入住养老机构公示表 */
    //   function extractTableData9() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable9");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年9月困难人员入住养老机构公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //         priceTime: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData9 = extractTableData9();
    //   // tableData.splice(0, 1);
    //   console.log(tableData9,9);




    //   /**海滨街2024年9月特困人员照料护理补贴人员公示表 */
    //   function extractTableData10() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable10");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年9月特困人员照料护理补贴人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //         // priceTime: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData10 = extractTableData10();
    //   // tableData.splice(0, 1);
    //   console.log(tableData10,10);




    //   /**海滨街2024年9月特困人员特殊生活补贴人员公示表 */
    //   function extractTableData11() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable11");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年9月特困人员特殊生活补贴人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //         // priceTime: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData11 = extractTableData11();
    //   // tableData.splice(0, 1);
    //   console.log(tableData11,11);




    //   /**海滨街2024年9月城乡低收入人员公示表 */
    //   function extractTableData12() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable12");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "海滨街2024年9月城乡低收入人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         population: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData12 = extractTableData12();
    //   // tableData.splice(0, 1);
    //   console.log(tableData12,12);




    //   /***联盟村2024年9月困难人员入住养老机构公示表 */
    //   function extractTableData13() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable13");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "联盟村2024年9月困难人员入住养老机构公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //         priceTime: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData13 = extractTableData13();
    //   // tableData.splice(0, 1);
    //   console.log(tableData13,13);




    //   /**联盟村2024年9月实物救助人员公示表 */
    //   function extractTableData14() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable14");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "联盟村2024年9月实物救助人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         ownerName: cells[1].textContent.trim(),
    //         population: cells[2].textContent.trim(),
    //         price: cells[3].textContent.trim(),
    //         // priceTime: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData14 = extractTableData14();
    //   // tableData.splice(0, 1);
    //   console.log(tableData14,14);



      
    //   /**"海滨街2024年7月无丧葬补助居民丧葬补贴发放人员公示表				" */
    //   function extractTableData15() {
    //     // 获取表格元素
    //     const table = document.querySelector(".noBorderTable15");
    //     // 获取所有行
    //     const rows = table.querySelectorAll("tbody tr");
    //     // console.log(rows);

    //     // 创建一个数组来存储数据
    //     const data = [];
    //     const rowData = {
    //       title: "联盟村2024年9月实物救助人员公示表",
    //       children: [],
    //     };
    //     rows.forEach((row) => {
    //       // 获取当前行的所有单元格
    //       const cells = row.querySelectorAll("td");
    //       // console.log(cells);

    //       // 创建一个对象来存储当前行的数据

    //       rowData.children.push({
    //         id: cells[0].textContent.trim(),
    //         street: cells[1].textContent.trim(),
    //         name: cells[2].textContent.trim(),
    //         deathName: cells[3].textContent.trim(),
    //         price: cells[4].textContent.trim(),
    //       });
    //       // 将当前行的数据添加到数组中
    //     });
    //     data.push(rowData);
    //     // 返回提取的数据
    //     return data;
    //   }
    //   // 调用函数并打印结果
    //   const tableData15 = extractTableData15();
    //   // tableData.splice(0, 1);
    //   console.log(tableData15,15);
    // });
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 24%;
    background-color: #1caabd;
    padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    height: 140px;
  }
}

.header1 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.header1-img {
  width: 50%;
  height: 105px;
  // background-color: #a80e0e;
  background-image: url(https://static.tdesign.tencent.com/assets/miniapp-light.11945e01.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 21px -49px;
  // transition: all 0.3s;
}

.header1-img:hover {
  animation: run 2s infinite step-start;
}

// @keyframes run {
//   to {
//     background-position: 21px -49px;
//   }

//   from {
//     background-position: 21px -4376px;
//   }
// }

@keyframes run {
  0% {
    background-position: 21px -49px;
  }

  4% {
    background-position: 21px -222px;
  }

  8% {
    background-position: 21px -396px;
  }

  12% {
    background-position: 21px -569px;
  }

  16% {
    background-position: 21px -742px;
  }

  20% {
    background-position: 21px -918px;
  }

  24% {
    background-position: 21px -1093px;
  }

  28% {
    background-position: 21px -1265px;
  }

  32% {
    background-position: 21px -1438px;
  }

  36% {
    background-position: 21px -1611px;
  }

  40% {
    background-position: 21px -1783px;
  }

  44% {
    background-position: 21px -1956px;
  }

  48% {
    background-position: 21px -2128px;
  }

  52% {
    background-position: 21px -2300px;
  }

  56% {
    background-position: 21px -2473px;
  }

  60% {
    background-position: 21px -2646px;
  }

  64% {
    background-position: 21px -2818px;
  }

  68% {
    background-position: 21px -2991px;
  }

  72% {
    background-position: 21px -3165px;
  }

  76% {
    background-position: 21px -3337px;
  }

  80% {
    background-position: 21px -3510px;
  }

  84% {
    background-position: 21px -3683px;
  }

  88% {
    background-position: 21px -3856px;
  }

  92% {
    background-position: 21px -4030px;
  }

  96% {
    background-position: 21px -4203px;
  }

  100% {
    background-position: 21px -4376px;
  }
}
</style>
