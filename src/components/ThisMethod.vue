<template>
    <div>
        
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      testData1: 'testData1',
      testData2: 'testData2'
    }
  },
  created() {
    console.log('created');
  },
  mounted: function() {
    this.test1();
    this.test2();
    this.test3();
    this.test4();
    this.test5();
    this.test6();
    this.test7();
  },
  methods: {
    // 일반적인 함수 생성
    test1: function() {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('test1: ', this);
    },
 
    // 함수에 async 키워드 추가
    test2: async function() {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('test2: ', this);
    },
 
    // ECMAScript2015 - 단축 구문 함수 생성
    test3() {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('test3: ', this);
    },
 
    // ECMAScript2015 - 단축 구문 함수 생성 (async 키워드 추가)
    async test4() {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('test4: ', this);
    },
 
    // Arrow Function 지정
    test5: () => {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('test5: ', this);
    },
 
 
    callbackTest: function(obj) {
      // eslint-disable-next-line no-debugger
      debugger;
      obj.callback(obj.data);
    },
    test6: function() {
      this.callbackTest({
        data: this.testData1,
        // 콜백함수 정상적으로 생성
        callback: function(res) {
          // eslint-disable-next-line no-debugger
          debugger;
          console.log(res, this);
        }
      });
    },
    test7: function() {
      this.callbackTest({
        data: this.testData2,
        // 콜백함수 Arrow Function 으로 생성
        callback: (res) => {
          // eslint-disable-next-line no-debugger
          debugger;
          console.log(res, this);
        }
      });
    },
    test8: function() {
      // this 객체를 복사
      var context = this;
      this.callbackTest({
        data: this.testData2,
        callback: function(res) {
          // eslint-disable-next-line no-debugger
          debugger;
          console.log(res, context);
        }
      });
    },
  }
}
</script>

