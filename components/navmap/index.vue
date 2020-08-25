<template>
 <div>
   <svg
    class="navmap"
  ></svg>
 </div>
</template>

<script>
  import * as d3 from "d3";
  import navmapJson from "~/static/json/navmap.json";

  export default {
    components: {
    },
    created() {
      this.navmapJson = navmapJson;
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize)
    },
    data: () => ({
      data: {
        width: 1200,
        height: 800,
        navmapJson: null,
        link: null,
        node: null,
        graphLayout: null,
      },
    }),
    methods: {
      handleResize() {
        this.width = window.innerWidth -10;
        this.height = window.innerHeight -30 ;
        this.createMap();
      },
      goTo(slug) {
        // console.log(slug);
        this.$router.push(slug);
      },
      createMap() {
        const svg = d3.select("svg");

        svg.selectAll("*").remove();
        svg.attr("width", this.width);
        svg.attr("height", this.height);

        const container = svg
        .append("g");

        this.link = container
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.navmapJson.links)
        .enter()
        .append("line")
        .attr("stroke", "#eee")
        .attr("stroke-width", "8px");

        this.node = container
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(this.navmapJson.nodes)
        .enter()
        .append("g")
        .attr("class", "node")

        this.node
        .append("circle")
        .attr("r", 24)
        .attr("fill", function(d) {
          return d.color;
        })
        .on("click", (node) => this.goTo(node.slug));

        this.node
          .append("text")
          .text(function(d) {return d.label;})
          .attr("class", "node-text")
          .style("fill", "#0000ff")
          .attr("x", -5 )
          .attr("y", 5 )
          .on("click", (node) => this.goTo(node.slug));

        this.graphLayout = d3
        .forceSimulation(this.navmapJson.nodes)
        .force("charge", d3.forceManyBody().strength(-2500)) // change here for distance between nodes
        .force("center", d3.forceCenter(this.width / 2, this.height / 2 - 150))
        .force("link", d3.forceLink(this.navmapJson.links)
          .id(function(d) {return d.id; })
          .distance(10)
          .strength(1))
        .on("tick", this.ticked);

        this.node.call(
          d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
        );

      },
      ticked() {
          this.node.call(this.updateNode);
          this.link.call(this.updateLink);
      },
      fixna(x) {
        if (isFinite(x)) return x;
        return 0;
      },
      updateLink(link) {
        const fixna = this.fixna;

        link
          .attr("x1", function(d) { return fixna(d.source.x); })
          .attr("y1", function(d) { return fixna(d.source.y); })
          .attr("x2", function(d) { return fixna(d.target.x); })
          .attr("y2", function(d) { return fixna(d.target.y); })
      },
      updateNode(node) {
        const fixna = this.fixna;

        node.attr("transform", function(d) {
          return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });

      },
      updateLabel(label) {
        const fixna = this.fixna;

        label.attr("transform", function(d) {
          return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });

      },
      dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) this.graphLayout.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      },
      dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      },
      dragended(d) {
        if (!d3.event.active) this.graphLayout.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

    }
  }

</script>

<style>
  /* @import '~assets/scss/main.scss'; */

  .navmap {
    height: calc(100vh - 135px);
    margin: 130px 0 0 0;
    width: 100vw;
  }

  .link {
    fill: none;
  }

  .node circle {
    cursor: pointer;
    stroke-width: 5px;
    stroke: #fff;
  }

  .node circle:hover {
    fill: red;
    transition: 1.0s;
  }

  .node-text {
    cursor: pointer;
    font-family: 'Courier Prime', monospace;
    font-size: 20px;
    user-select: none;
  }

  .node:hover > circle {
    fill: red;
    transition: 1.0s;
  }

  @media only screen and (max-width: 880px) {

    .navmap {
      height: calc(100vh - 125px);
      margin: 110px 0 0 0;
    }

  }

</style>
