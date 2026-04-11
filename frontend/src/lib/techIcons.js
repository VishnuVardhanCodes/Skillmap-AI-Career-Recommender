const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const iconMap = {
  // Languages
  "python": `${ICON_BASE}/python/python-original.svg`,
  "javascript": `${ICON_BASE}/javascript/javascript-original.svg`,
  "typescript": `${ICON_BASE}/typescript/typescript-original.svg`,
  "html": `${ICON_BASE}/html5/html5-original.svg`,
  "html5": `${ICON_BASE}/html5/html5-original.svg`,
  "css": `${ICON_BASE}/css3/css3-original.svg`,
  "css3": `${ICON_BASE}/css3/css3-original.svg`,
  "java": `${ICON_BASE}/java/java-original.svg`,
  "c++": `${ICON_BASE}/cplusplus/cplusplus-original.svg`,
  "c#": `${ICON_BASE}/csharp/csharp-original.svg`,
  "ruby": `${ICON_BASE}/ruby/ruby-original.svg`,
  "go": `${ICON_BASE}/go/go-original.svg`,
  "sql": `${ICON_BASE}/postgresql/postgresql-original.svg`,

  // Frontend
  "react": `${ICON_BASE}/react/react-original.svg`,
  "react.js": `${ICON_BASE}/react/react-original.svg`,
  "vue": `${ICON_BASE}/vuejs/vuejs-original.svg`,
  "vue.js": `${ICON_BASE}/vuejs/vuejs-original.svg`,
  "angular": `${ICON_BASE}/angularjs/angularjs-original.svg`,
  "next.js": `${ICON_BASE}/nextjs/nextjs-original.svg`,
  "tailwind": `${ICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "tailwindcss": `${ICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "bootstrap": `${ICON_BASE}/bootstrap/bootstrap-original.svg`,
  "sass": `${ICON_BASE}/sass/sass-original.svg`,

  // Backend
  "node.js": `${ICON_BASE}/nodejs/nodejs-original.svg`,
  "nodejs": `${ICON_BASE}/nodejs/nodejs-original.svg`,
  "express": `${ICON_BASE}/express/express-original.svg`,
  "flask": `${ICON_BASE}/flask/flask-original.svg`,
  "django": `${ICON_BASE}/django/django-plain.svg`,
  "spring": `${ICON_BASE}/spring/spring-original.svg`,
  "mongodb": `${ICON_BASE}/mongodb/mongodb-original.svg`,
  "postgresql": `${ICON_BASE}/postgresql/postgresql-original.svg`,
  "mysql": `${ICON_BASE}/mysql/mysql-original.svg`,
  "redis": `${ICON_BASE}/redis/redis-original.svg`,

  // Devops / Cloud
  "docker": `${ICON_BASE}/docker/docker-original.svg`,
  "kubernetes": `${ICON_BASE}/kubernetes/kubernetes-plain.svg`,
  "aws": `https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "azure": `${ICON_BASE}/azure/azure-original.svg`,
  "gcp": `${ICON_BASE}/googlecloud/googlecloud-original.svg`,
  "github": `${ICON_BASE}/github/github-original.svg`,
  "jenkins": `${ICON_BASE}/jenkins/jenkins-original.svg`,

  // Data Science
  "pandas": `${ICON_BASE}/pandas/pandas-original.svg`,
  "numpy": `${ICON_BASE}/numpy/numpy-original.svg`,
  "scikit-learn": `https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg`,
  "tensorflow": `${ICON_BASE}/tensorflow/tensorflow-original.svg`,
  "pytorch": `${ICON_BASE}/pytorch/pytorch-original.svg`
};

export const getTechIcon = (name) => {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  
  // Direct match
  if (iconMap[key]) return iconMap[key];
  
  // Partial match
  const match = Object.keys(iconMap).find(k => key.includes(k));
  return match ? iconMap[match] : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e1b4b&color=818cf8&bold=true`;
};
