interface Snippet {
  description: string;
  content: string;
}

interface SnippetMap {
  [key: string]: Snippet;
}

export const htmlSnippets: SnippetMap = {
  'div': {
    description: 'Create a div element',
    content: '<div class="${1:className}">\n  ${2}\n</div>'
  },
  'span': {
    description: 'Create a span element',
    content: '<span class="${1:className}">${2}</span>'
  },
  'container': {
    description: 'Create a container div',
    content: '<div class="container">\n  ${1}\n</div>'
  },
  'flex': {
    description: 'Create a flex container',
    content: '<div class="flex">\n  ${1}\n</div>'
  },
  'grid': {
    description: 'Create a grid container',
    content: '<div class="grid">\n  ${1}\n</div>'
  }
};

export const cssSnippets: SnippetMap = {
  'flex': {
    description: 'Flexbox container',
    content: 'display: flex;\nalign-items: ${1:center};\njustify-content: ${2:center};'
  },
  'grid': {
    description: 'Grid container',
    content: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};\ngap: ${2:1rem};'
  },
  'center': {
    description: 'Center element with position absolute',
    content: 'position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);'
  },
  'size': {
    description: 'Width and height',
    content: 'width: ${1:100px};\nheight: ${2:100px};'
  },
  'circle': {
    description: 'Circular element',
    content: 'border-radius: 50%;'
  },
  'gradient': {
    description: 'Linear gradient background',
    content: 'background: linear-gradient(${1:45deg}, ${2:#000} 0%, ${3:#fff} 100%);'
  },
  'shadow': {
    description: 'Box shadow',
    content: 'box-shadow: ${1:0} ${2:2px} ${3:4px} ${4:rgba(0, 0, 0, 0.1)};'
  },
  'transition': {
    description: 'Transition',
    content: 'transition: ${1:all} ${2:0.3s} ${3:ease};'
  },
  'animation': {
    description: 'Animation',
    content: '@keyframes ${1:animationName} {\n  0% {\n    ${2}\n  }\n  100% {\n    ${3}\n  }\n}\n\nanimation: ${1:animationName} ${4:1s} ${5:ease} ${6:infinite};'
  },
  'media': {
    description: 'Media query',
    content: '@media (min-width: ${1:768px}) {\n  ${2}\n}'
  }
};
