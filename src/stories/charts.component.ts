    // charts-apex.component.ts
    import { CommonModule } from '@angular/common';
    import { Component, Input, OnChanges } from '@angular/core';
    // Note: don't instantiate ApexCharts directly in a Storybook component.
    // Use the 'apx-chart' component provided by 'ng-apexcharts' instead.
    import { NgApexchartsModule } from 'ng-apexcharts';
    import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexPlotOptions,
    ApexGrid,
    ApexLegend,
    ApexFill,
    ApexStroke,
    ApexYAxis,
    ApexNonAxisChartSeries
    } from 'ng-apexcharts';
    @Component({
    selector: 'storybook-charts',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    template: `
        <div class="{{ type }}-{{ variant }}">
        <h3 class="title">{{ title }}</h3>

        <apx-chart
            [series]="series"
            [chart]="chart"
            [plotOptions]="plotOptions"
            [xaxis]="xaxis"
            [yaxis]="yaxis"
            [dataLabels]="dataLabels"
            [legend]="legend"
            [grid]="grid"
            [fill]="fill"
            [stroke]="stroke"
              [labels]="labels"          
            class="chart-values"
        ></apx-chart>
        </div>

    `,
    })
    export class ChartsComponent implements OnChanges {
    @Input() type:
        | 'barchart'
        | 'stackedbarchart'
        | 'linechart'
        | 'boxplotchart'
        | 'bubblechart'
        | 'piechart'
        | 'doughnutchart'
        | 'radialbarchart' = 'barchart';

    @Input() variant = 'default';
    @Input() title = 'Title';
    @Input() data: any[] = []; // [{label, value, color}]
    @Input() height = 300;
    @Input() showLegend = true;

    // Apex props
    series: ApexAxisChartSeries | ApexNonAxisChartSeries = [];
    chart: ApexChart = { type: 'bar', height: this.height, toolbar: { show: false } };
    xaxis: ApexXAxis = {};
    yaxis: ApexYAxis | ApexYAxis[] = {};
    grid: ApexGrid = {};
    dataLabels: ApexDataLabels = { enabled: false };
    legend: ApexLegend = {};
    plotOptions: ApexPlotOptions = {};
    fill: ApexFill = {};
    stroke: ApexStroke = {};
    colors: string[] = [];
    labels: string[] = [];
    responsive: any[] = [];

    customLegend = false; // For stacked, bar, etc.

    ngOnChanges(): void {
        switch (this.type) {
        case 'barchart':
            this.initBar();
            break;
        case 'stackedbarchart':
            this.initStackedBar();
            break;
        case 'linechart':
            this.initLine();
            break;
        case 'boxplotchart':
            this.initBoxplot();
            break;
        case 'bubblechart':
            this.initBubble();
            break;
        case 'piechart':
            this.initPie();
            break;
        case 'doughnutchart':
            this.initDonut();
            break;
        case 'radialbarchart':
            this.initRadial();
            break;
        }
    }

    /** ---------------- BAR CHART ---------------- */
    initBar() {
        this.series = [{ name: this.title, data: this.data.map(d => Number(d.value)) }];
        this.colors = this.data.map(d => d.color || '#2196f3');
        this.chart = { type: 'bar', height: this.height, toolbar: { show: false } };

        this.plotOptions = {
        bar: {
            horizontal: false,
            columnWidth: '40%',
            borderRadius: 4,
        },
        };

        this.xaxis = { categories: this.data.map(d => d.label) };
        this.yaxis = { labels: { formatter: val => String(val) } };

        this.grid = { show: true, strokeDashArray: 4 };

        this.dataLabels = { enabled: true, offsetY: -10, style: { colors: ['#555'] } };

        this.legend = { show: true, position: 'bottom', offsetY: 0 };
        this.customLegend = false;

    }
    initBoxplot() {
    this.chart = {
        type: 'boxPlot',
        height: this.height,
        toolbar: { show: false }
    };

    this.series = [
        {
        name: 'Sample Text 1',
        data: [
            { x: 'Category A', y: [54, 66, 69, 75, 88] },
            { x: 'Category B', y: [43, 65, 69, 76, 81] },
            { x: 'Category C', y: [31, 39, 45, 51, 59] },
            { x: 'Category D', y: [39, 46, 55, 65, 71] }
        ]
        }
    ];
    this.yaxis = {
        categories: ['Category A', 'Category B', 'Category C', 'Category D']
    } as any;
    this.xaxis = {
        type: 'numeric',
        title: { text: 'Values' }
    };

    this.colors = ['#f97316'];

    this.plotOptions = {
        boxPlot: {
        colors: {
            upper: '#f97316',
            lower: '#fcd34d'
            
        }
        }
    };
    this.plotOptions = {
        bar: {
        horizontal: true,  
        barHeight: '50%',
        rangeBarGroupRows: true
        }
    };
    this.grid = {
        borderColor: '#eee',
        strokeDashArray: 4
    };

    this.legend = { show: false };
    }





    /** ---------------- STACKED BAR ---------------- */
    initStackedBar() {
        this.series = [
        { name: 'Sample 1', data: [40, 60, 75, 60, 40] },
        { name: 'Sample 2', data: [30, 40, 50, 40, 30] },
        { name: 'Sample 3', data: [20, 30, 40, 50, 20] },
        { name: 'Sample 4', data: [10, 20, 30, 20, 10] },
        ];
        this.colors = ['#1e88e5', '#43a047', '#fbc02d', '#e53935'];

        this.chart = { type: 'bar', height: this.height, stacked: true, toolbar: { show: false } };
        this.plotOptions = { bar: { horizontal: false, columnWidth: '40%' } };
        this.xaxis = { categories: ['2021', '2022', '2023', '2024', '2025'] };
        this.grid = { show: true, strokeDashArray: 4 };
        this.legend = { show: true, position: 'bottom' };
        this.customLegend = false;
    }

    /** ---------------- LINE ---------------- */
    initLine() {
        this.series = [{ name: this.title, data: this.data.map(d => Number(d.value)) }];
        this.colors = ['#42a5f5'];

        this.chart = { type: 'line', height: this.height, toolbar: { show: false } };
        this.stroke = { curve: 'smooth', width: 3 };
        this.xaxis = { categories: this.data.map(d => d.label) };
        this.grid = { show: true, strokeDashArray: 4 };
        this.legend = { show: false };
        this.dataLabels = { enabled: true };
        this.customLegend = false;
    }


    /** ---------------- BUBBLE ---------------- */
    initBubble() {
        this.series = [
            {
            name: "Bubble1",
            data: this.generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60
            })
            },
        {
            name: 'Sample 2',
            data: [
            [15, 25, 20],
            [25, 35, 30],
            [35, 45, 40],
            ],
        },
        ];
        this.colors = ['#00c853', '#ff6d00'];

        this.chart = { type: 'bubble', height: this.height, toolbar: { show: false } };
        this.xaxis = { tickAmount: 5 };
        this.yaxis = { max: 60 };
        this.grid = { show: true, strokeDashArray: 4 };
        this.legend = { show: true, position: 'bottom' };
        this.customLegend = false;
    }
    public generateData(baseval: number, count: number, yrange: { min: any; max: any; }) {
        var i = 0;
        var series = [];
        while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
        }
        return series;
    }
    /** ---------------- PIE ---------------- */
    initPie() {
        this.series = this.data.map(d => Number(d.value));
        this.labels = this.data.map(d => d.label);
        this.colors = this.data.map(d => d.color || '#42a5f5');
    this.chart = { type: 'pie', height: this.height + 80, toolbar: { show: false } };
        this.dataLabels = {
            enabled: true,
            style: { colors: ['#ffffff'] },
            dropShadow: { enabled: false },
            formatter: (val, opts) => {
                const seriesIndex = opts.seriesIndex;
                const w = opts.w;
                if (w && w.config && Array.isArray(w.config.series)) {
                    return String(w.config.series[seriesIndex]);
                }
                return String(val);
            }
        } as ApexDataLabels;

    this.legend = { show: true, position: 'right', offsetY: 0 };
        this.customLegend = false;
    }

initDonut() {
  // series & labels
  this.series = this.data.map(d => Number(d.value));
  this.labels = this.data.map(d => d.label);
  this.colors = this.data.map(d => d.color || '#ab47bc');

  // chart config
  this.chart = {
    type: 'donut',
    height: this.height,          // +80 remove pannalaam; CSS use pannunga
    toolbar: { show: false }
  };

  this.dataLabels = {enabled: true, style: { colors: ['#ffffff'] },
    dropShadow: { enabled: false }
  };
  this.legend = {show: true,fontSize: '14px',
  };
}


    /** ---------------- RADIAL BAR ---------------- */
    initRadial() {
        this.series = this.data.map(d => Number(d.value));
        this.labels = this.data.map(d => d.label);
        this.colors = this.data.map(d => d.color || '#ef5350');

        this.chart = { type: 'radialBar', height: this.height };
        this.plotOptions = {
        radialBar: {
            hollow: { size: '40%' },
            dataLabels: { name: { fontSize: '14px' }, value: { fontSize: '16px' } },
        },
        };
        this.legend = { show: true, position: 'bottom' };
        this.customLegend = false;
    }

    legendItems() {
        return this.data.map(d => ({ label: d.label, color: d.color || '#999' }));
    }
    }
