<template>
    <aside id="left-side-bar">
        <h2>Меню</h2>
        <div class="aside-dropdown" v-for="(menuList, i) in menuLists" :key="i">
            <hr>
            {{ menuList.title }}
            <div class="aside-content">
                <div v-for="(link, j) in menuList.links" :key="j">
                    <hr>
                    <router-link 
                    :to="link.link" 
                    class="aside-li"> {{ link.title }}</router-link>
                </div>
            </div>
        </div>
        <hr>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            menuLists: [
                {
                    title: 'Обзор статей',
                    links: [
                        {
                            title: 'Домой',
                            link: '/'
                        },
                        {
                            title: 'Поиск',
                            link: '/search'
                        }, 
                        {
                            title: 'Предпочтения',
                            link: '/preferences'
                        }, 
                    ]
                },
                {
                    title: "Написание",
                    links: [
                        {
                            title: 'Новая статья',
                            link: '/new-article'
                        }, 
                        {
                            title: 'Черновики',
                            link: '/drafts'
                        }, 
                        {
                            title: 'Созданные',
                            link: '/created'
                        }, 
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
h2 {
    background: radial-gradient(rgb(86, 86, 255), rgb(53, 53, 167));
}

hr {
    margin: 0;
}

.aside-dropdown {
    margin: 0;
    padding: 0;
    list-style: none;
    background: radial-gradient(rgb(101, 157, 231), rgb(76, 124, 185));
    cursor: pointer;
}

.aside-dropdown:hover {
    background: rgb(133, 181, 243);
}

.aside-content{
    display: none;
	position: absolute;
}

.aside-dropdown:hover .aside-content{
    display: flex;
    flex-direction: column;
	margin-left: 19vw;
	margin-top: -35px;
    width: 12rem;
}

a:hover{
    background: rgb(136, 186, 252);
}

a {
    text-decoration: none;
    color: white;
    background: radial-gradient(rgb(101, 157, 231), rgb(76, 124, 185));
    display: inline-block;
    width: 100%;
}

#left-side-bar {
    width: 19vw;
    position: fixed;
    top: 3.5rem;
    left: 0;
    color: white;
    background: transparent;
    font-size: 24px;
    font-family: 'Open sans', Helvetica, sans-serif;
    z-index: 1000;
}
</style>