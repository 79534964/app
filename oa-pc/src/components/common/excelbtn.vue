<template>
  <div class="excelwrapper clearfix">
    <div class="btnwrapper">
      <a class="excelbtn" :download="excelTite" :href="excelTable">导出</a>
    </div>
    <span class="prompt">{{prop}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import excelHashMaps from 'common/js/excelHashMaps';

  export default {
    data() {
      return {
        prop: ''
      };
    },
    props: {
      list: {
        type: Array
      },
      excelTite: {
        type: String
      },
      type: {
        type: String
      }
    },
    created() {
      // 进行Safari判断
      let safari = navigator.userAgent.toLowerCase().match(/version\/([\d.]+)/);
      if (safari && safari[1]) {
        this.prop = '(建议您使用谷歌浏览器,否则需要自行给文件加后缀.xls)';
      }
    },
    methods: {
      getTable() {
        let map = excelHashMaps[this.type];
        let str = '<tr>';
        for (let entry of map) {
          str += `<th>${entry[1]}</th>`;
        }
        str += '</tr>';
        Array.from(this.list, function (item) {
          str += '<tr>';
          for (let entry of map) {
            str += `<th>${item[entry[0]]}</th>`;
          }
          str += '</tr>';
        });
        return str;
      }
    },
    computed: {
      excelTable () {
        return 'data:application/vnd.ms-excel;base64,' + window.btoa(unescape(encodeURIComponent(`
               <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                  <head>
                    <meta charset="UTF-8">
                    <!--[if gte mso 9]>
                      <xml>
                        <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                          <x:Name>${this.excelTite}</x:Name>
                          <x:WorksheetOptions>
                            <x:DisplayGridlines/>
                          </x:WorksheetOptions>
                        </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                        </x:ExcelWorkbook>
                      </xml>
                    <![endif]-->
                    <style>
                      th,td{
                        bor
                        font-size:20px;
                        width:150px;
                        height:50px;
                        text-align:center;
                      }
                    </style>
                  </head>
                  <body>
                    <table border="1">` + this.getTable() + `</table>
                  </body>
                </html>
              `)));
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .excelwrapper
    width: 300px
    .btnwrapper
      float: left
      width: 120px
      height: 40px
      line-height: 40px
      .excelbtn
        display: block
        background-color: #0663a2
        color: #fff
        font-size: 18px
        border-radius: 4px
        letter-spacing: 6px
        padding-left: 6px
    .prompt
      float: left
      font-size: 12px
      margin-top: 4px
</style>
