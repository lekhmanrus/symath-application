'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('symathApp.services', [])

.value('version', '0.1')

.value('cookbook', [
  { index: 0, 
    title: 'Addition',
    content: [
      {
        clickable: true,
        value: '7 + 14 = 21'
      },
      {
        clickable: true,
        value: '21 * d + 3 * d = 24 * d'
      }
  ]},
  {
    index: 1,
    title: 'Substraction',
    content: [
      {
        clickable: true,
        value: '127 - 8 = 119'
      },
      {
        clickable: true,
        value: '21 * d - 3 * d = 18 * d'
      }
  ]},
  {
    index: 2,
    title: 'Multiplication',
    content: [
      {
        clickable: true,
        value: '15 * 3 = 45'
      },
      {
        clickable: true,
        value: '30 * b *c  * c = 30 * b * c^2'
      }
  ]},
  {
    index: 3,
    title: 'Division',
    content: [
      {
        clickable: true,
        value: '33 / 11 = 3'
      },
      {
        clickable: true,
        value: '3*a / a = 3'
      }
  ]},
  {
    index: 4,
    title: 'Involution',
    content: [{
      clickable: true,
      value: '2^5 + 3^2'
  }]},
  {
    index: 5,
    title: 'Operations with fractions',
    content: [
      {
        clickable: false,
        value: 'For operations with fractions, just write numbers, using slash and press the button.'
      },
      {
        clickable: true,
        value: '7/8 + 4/8 =11/8'
      }
  ]},
  {
    index: 6,
    title: 'Trigonometry',
    content: [
      {
        clickable: true,
        value: 'sin(?)'
      },
      {
        clickable: true,
        value: 'tan(60)'
      },
      {
        clickable: true,
        value: '5*cos(0.56)'
      }
  ]},
  {
    index: 7,
    title: 'Solve equations',
    content: [{
      clickable: true,
      value: 'x^2 + 3*x1 - 4 = 0'
  }]},
  {
    index: 8,
    title: 'Integrals',
    content: [{
      clickable: true,
      value: 'int (x+y) dx'
  }]},
  {
    index: 9,
    title: 'Derivatives',
    content: [{
      clickable: true,
      value: 'partial x/dx (x^2 + 5)'
  }]},
  {
    index: 10,
    title: 'Complex numbers',
    content: [{
      clickable: true,
      value: '5 + 3i'
  }]}
]);