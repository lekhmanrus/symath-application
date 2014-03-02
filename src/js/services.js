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
        text: '7 + 14 = 21',
        value: '7 + 14'
      },
      {
        clickable: true,
        text: '21 * d + 3 * d = 24 * d',
        value: '21 * d + 3 * d'
      }
  ]},
  {
    index: 1,
    title: 'Substraction',
    content: [
      {
        clickable: true,
        text: '127 - 8 = 119',
        value: '127 - 8'
      },
      {
        clickable: true,
        text: '21 * d - 3 * d = 18 * d',
        value: '21 * d - 3 * d'
      }
  ]},
  {
    index: 2,
    title: 'Multiplication',
    content: [
      {
        clickable: true,
        text: '15 * 3 = 45',
        value: '15 * 3'
      },
      {
        clickable: true,
        text: '30 * b *c  * c = 30 * b * c ^ 2',
        value: '30 * b * c * c'
      }
  ]},
  {
    index: 3,
    title: 'Division',
    content: [
      {
        clickable: true,
        text: '33 / 11 = 3',
        value: '33 / 11'
      },
      {
        clickable: true,
        text: '3 * a / a = 3',
        value: '3 * a / a'
      }
  ]},
  {
    index: 4,
    title: 'Involution',
    content: [{
      clickable: true,
      text: '2 ^ 5 + 3 ^ 2 = 41',
      value: '2 ^ 5 + 3 ^ 2'
  }]},
  {
    index: 5,
    title: 'Operations with fractions',
    content: [
      {
        clickable: false,
        text: 'For operations with fractions, just write numbers, using slash and press the button.'
      },
      {
        clickable: true,
        text: '7/8 + 4/8 = 11/8',
        value: '7/8 + 4/8'
      }
  ]},
  {
    index: 6,
    title: 'Trigonometry',
    content: [
      {
        clickable: true,
        text: 'sin(30)',
        value: 'sin(30)'
      },
      {
        clickable: true,
        text: 'tan(60)',
        value: 'tan(60)'
      },
      {
        clickable: true,
        text: '5*cos(0.56)',
        value: '5*cos(0.56)'
      }
  ]},
  {
    index: 7,
    title: 'Solve equations',
    content: [{
      clickable: true,
      text: 'x ^ 2 + 3 * x1 - 4 = 0',
      value: 'x ^ 2 + 3 * x1 - 4'
  }]},
  {
    index: 8,
    title: 'Integrals',
    content: [{
      clickable: true,
      text: 'int (x+y) dx',
      value: 'int (x+y) dx'
  }]},
  {
    index: 9,
    title: 'Derivatives',
    content: [{
      clickable: true,
      text: 'partial x/dx (x^2 + 5)',
      value: 'partial x/dx (x^2 + 5)'
  }]},
  {
    index: 10,
    title: 'Complex numbers',
    content: [{
      clickable: true,
      text: '5 + 3i',
      value: '5 + 3i'
  }]}
]);