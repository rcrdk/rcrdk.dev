import type { HistoryProject } from '@/types/history'

export const MEU_ROSINHA_PROJECTS: HistoryProject[] = [
	{
		companyId: 'meu-rosinha',
		id: 'meu-rosinha-webapp',
		image: '/projects/rosinha-webapp.webp',
		categories: ['Web App'],
		stack: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Sass', 'HTML', 'CSS', 'Context API', 'React Hook Form', 'React Query', 'Zod'],
		year: 2023,
		links: {
			behance: 'https://www.behance.net/gallery/204162471/Meu-Rosinha-organizacao-para-consultoras-de-beleza',
			github: null,
			website: 'https://app.meurosinha.com.br',
		},
		'pt-br': {
			title: 'Meu Rosinha',
			description: 'O Rosinha é uma ferramenta de gestão que nasceu em 2016 pensado especialmente para consultoras de beleza, revendedoras de produtos e empresárias. Criado para ser um assistente inteligente, para simplificar o negócio e proporcionar mais resultados. \n Este projeto, batizado como v2, surgiu com a proposta de renovação da ferramenta com código e tecnologias modernos, um novo visual, uma nova experiência de uso. A proposta vem sendo expandir o negócio através de melhorias e novas features, principalmente requisitados pelos seus usuários. \n O Rosinha conta com a gestão de agenda, clientes, contatos, financeiro, metas, estoque, trocas, relatórios, lojinha online, automação de mensagens e campanhas via WhatsApp, além de ter uma comunidade exclusiva com diversos conteúdos em imagens, vídeos, arquivos e publicações do blog.',
		},
		en: {
			title: 'Meu Rosinha',
			description: 'Rosinha is a management tool created in 2016, designed especially for beauty consultants, product resellers, and entrepreneurs. Built to be an intelligent assistant, it simplifies business operations and drives better results. \n This project, named v2, was born with the goal of renewing the tool with modern code and technologies, a fresh look, and an enhanced user experience. The vision is to expand the business by introducing improvements and new features, many of which are requested by its users. \n Rosinha offers management solutions for scheduling, clients, contacts, finances, goals, inventory, exchanges, reports, an online store, and automated messaging and WhatsApp campaigns. Additionally, it provides an exclusive community with a variety of content, including images, videos, files, and blog posts.',
		},
		gallery: [
			{ url: '/project/meu-rosinha-webapp/desktop-dashboard.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-webapp/mobile-calendar.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-webapp/desktop-home.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-webapp/mobile-contacts.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-webapp/desktop-custom.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-webapp/mobile-reports.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-webapp/desktop-stock.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-webapp/mobile-financial.jpg', format: 'mobile' },
		],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd', 'designer'] },
			{ id: 'cleitokarloh', roles: ['frontEnd'] },
			{ id: 'enzoDamascena', roles: ['frontEnd'] },
			{ id: 'meuRosinha', roles: ['company'] },
		],
	},
	{
		companyId: 'meu-rosinha',
		id: 'meu-rosinha-website',
		image: '/projects/rosinha-website.webp',
		categories: ['Website'],
		stack: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Stitches', 'HTML', 'CSS'],
		year: 2024,
		links: {
			behance: 'https://www.behance.net/gallery/204372983/Meu-Rosinha-Website',
			github: null,
			website: 'https://meurosinha.com.br',
		},
		'pt-br': {
			title: 'Meu Rosinha: Website',
			description: 'O Rosinha é uma ferramenta de gestão que nasceu em 2016 pensado especialmente para consultoras de beleza, revendedoras de produtos e empresárias. Criado para ser um assistente inteligente, para simplificar o negócio e proporcionar mais resultados. \n Este é o website oficial, criado para apresentar as principais funcionalidades e vantagens que a ferramenta oferece. Essa nova versão reflete as mudanças e novidades que a ferramenta vem trazendo nas grandes atualizações dos últimos anos e muitas que ainda estão por vir.',
		},
		en: {
			title: 'Meu Rosinha: Website',
			description: 'Rosinha is a management tool created in 2016, designed especially for beauty consultants, product resellers, and entrepreneurs. Built to be an intelligent assistant, it simplifies business operations and drives better results. \n This is the official website, created to showcase the tool’s key features and benefits. This new version reflects the changes and innovations introduced in major updates over the past years, with many more to come.',
		},
		// TODO: Add gallery
		gallery: [],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd', 'designer'] },
			{ id: 'cleitokarloh', roles: ['frontEnd'] },
			{ id: 'meuRosinha', roles: ['company'] },
		],
	},
	{
		companyId: 'meu-rosinha',
		id: 'meu-rosinha-online-store',
		image: '/projects/rosinha-stores.webp',
		categories: ['Web App'],
		links: {
			behance: 'https://www.behance.net/gallery/204376311/Meu-Rosinha-Loja-Online',
			github: null,
			website: 'https://loja.meurosinha.com.br/meurosinha',
		},
		stack: ['Laravel', 'JavaScript', 'Sass', 'HTML', 'CSS'],
		year: 2022,
		'pt-br': {
			title: 'Meu Rosinha: Lojinha Online',
			description: 'O Rosinha é uma ferramenta de gestão que nasceu em 2016 pensado especialmente para consultoras de beleza, revendedoras de produtos e empresárias. Criado para ser um assistente inteligente, para simplificar o negócio e proporcionar mais resultados. \n A loja online do Rosinha é um recurso que os usuários podem habilitar dentro da ferramenta para terem uma página de vitrine exclusiva e personalizável com seus produtos e promoções. É disponibilizado um link único e compartilhável que pode ser enviado para seus clientes. É possível adicionar produtos na sacola e no final fechar o pedido que será registrado no Rosinha e notificado para a consultora.',
		},
		en: {
			title: 'Meu Rosinha: Online Store',
			description: 'Rosinha is a management tool created in 2016, designed especially for beauty consultants, product resellers, and entrepreneurs. Built to be an intelligent assistant, it simplifies business operations and drives better results. \n Rosinha’s online store is a feature that users can enable within the tool to have an exclusive and customizable showcase page with their products and promotions. A unique, shareable link is provided, which can be sent to their clients. Clients can add products to the cart and, at the end, place the order, which will be recorded in Rosinha and notified to the consultant.',
		},
		gallery: [
			{ url: '/project/meu-rosinha-online-store/desktop-store-home.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-online-store/mobile-store-home.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-online-store/desktop-store-cart.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-online-store/mobile-store-cart.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-online-store/desktop-store-product.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-online-store/mobile-store-product.jpg', format: 'mobile' },
			{ url: '/project/meu-rosinha-online-store/desktop-store.jpg', format: 'desktop' },
			{ url: '/project/meu-rosinha-online-store/mobile-store.jpg', format: 'mobile' },
		],
		attributions: [
			{ id: 'rcrdk', roles: ['frontEnd'] },
			{ id: 'cleitokarloh', roles: ['backEnd'] },
			{ id: 'meuRosinha', roles: ['company'] },
		],
	},
]
