/**
 * Created by Administrator on 2016/11/23.
 */

export default {
  methods: {
    toPage (para) {
      if (typeof para === 'number') {
        this.$router.go(para)
      } else {
        this.$router.push(para)
      }
    }
  }
}
