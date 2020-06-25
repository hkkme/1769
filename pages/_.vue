<template>
  <div class="container">
    <top/>
    <div
      class="components-wrapper"
      v-for="(block, index) in page"
      :key="index"
    >
      <component
        :is="block.slice_type"
        :data="mapSlice(block).data"
      />
    </div>

    <div
      :class="[ showCookieBanner === true ? 'cookie-banner show' : 'cookie-banner']"
    >
      i want cookies <button @click="acceptCookies(true)">yes</button><button @click="acceptCookies(false)">no</button>
    </div>

  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import SliceMixin from '~/mixins/slice';

import headtags from "~/components/headtags";
import error from "~/components/error";
import top from "~/components/top";
import navmap from '../components/navmap';
import navmob from '../components/navmob';

import simplerawhtml from '~/components/simplerawhtml';
import simplecarousel from '~/components/simplecarousel';
import simplesignup from '~/components/simplesignup';
import customform from '~/components/customform';
import formgenerator from '~/components/formgenerator';

export default {
  created() {
    if ('utm_campaign' in this.$route.query && this.$route.path === '/') {
      setTimeout(() => { this.$router.push('/'); }, 2500);
    }
    this.isNavMap = this.$route.path === '/navmap' ? true : false;

  },
  mounted() {
    this.checkCookies();
  },
  components: {
    headtags,
    error,
    top,
    navmap,
    navmob,
    simplerawhtml,
    simplecarousel,
    simplesignup,
    customform,
    formgenerator,
  },
  data() {
    return {
      isNavMap: false,
      cookiesAccepted: false,
      showCookieBanner: false,
    };
  },
  mixins: [SliceMixin],
  methods: {
    checkCookies() {
      if (process.browser) {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if(cookiesAccepted === 'true') {
          setTimeout(() => { this.createCookies(); }, 1000);
        } else if (cookiesAccepted === 'false') {
          setTimeout(() => { this.clearCookies(); }, 1000);
        }

        this.showCookieBanner = cookiesAccepted === null ? true : false;
      }
    },
    createCookies() {
      //
    },
    clearCookies() {
      if (process.client) {
        document.cookie.split(";").forEach(c => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      }
    },
    acceptCookies(accept) {
      this.cookiesAccepted = accept;

      if (process.browser) {
        if (accept === true) {
          localStorage.setItem('cookiesAccepted', 'true');
          this.createCookies();
        } else {
          localStorage.setItem('cookiesAccepted', 'false');
          this.clearCookies();
        }

        this.showCookieBanner =false;
      }

    },
  },
  async asyncData ({$prismic, app, req, redirect}) {

    let url = '';
    let section = 'home';

    if (app.router.history.pending) {
      url = app.router.history.pending.fullPath;
    } else if (app.router.history.current) {
      url = app.router.history.current.fullPath;
    } else if (req) {
      url = req.url;
    }

    const urlSplits = url.substring(1).split('?');

    if (url !== '/') {
      const slugs = urlSplits[0].split('/');
      if (slugs && slugs[0]) {
        section = slugs[0];
      }

    }

    if (section === 'mail') {

      redirect("https://mx4bln1.prossl.de/1769.eu/webmail/index.php");

    } else if(section === 'navmap' || section === 'navmob') {

      return {
        page: [
          {
            slice_type: section,
            data: {},
          }
        ]
      }

    } else {

      try {

        const result = await $prismic.api.query(
          Prismic.Predicates.at('my.generic.slug', section),
          { lang: 'en-us' }
        );

        // console.log('results.data', result.results[0].data.body);

        return { page: result.results[0].data.body };

      } catch (error) {
        console.error('error: ', error);

        return {
          page: [
            {
              slice_type: 'error',
              data: {
                title: '404',
              },
            }
          ]
        }

      }

    }

  },
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/main.scss';

  .container {
    margin: 0;
  }

  .component-wrapper {
    margin: 0 auto;
    max-width: 1600px;
    min-width: 600px;
    width: calc(100vw - 280px);

    &.is-navmap {
      border-bottom: 0;
      margin-top: 0;
      max-width: none;
      min-width: 0;
      width: 100vw;
    }
  }

  .cookie-banner {
    background-color: black;
    bottom: 0;
    color: white;
    display: none;
    font-family: 'Courier Prime', monospace;
    height: 30px;
    padding: 5px;
    position: fixed;
    text-align: center;
    width: 100%;

    &.show {
      display: inline;
    }

    button {
      background-color: white;
      border: 0;
      color: black;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      font-size: 16px;
      margin: 0 2px;
      padding: 5px;

      &:hover {
        background-color: blue;
        color: white;
      }
    }
  }

  @media only screen and (max-width: 1300px) {

    .container {
      padding-top: 130px;
    }

    .component-wrapper {
      max-width: none;
      min-width: 0;
      width: 100%;
      margin: 0;
    }

  }

</style>
