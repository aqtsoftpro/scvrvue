<template>
<div class="d-flex flex-row mb-3">
    <router-link tag="a" :to="{ path: 'van_management/vehicle_detail/' + order.vehicle_id }" class="d-block position-relative">
        <img :src="order.img" style="width: 100px!important" :alt="order.title" class="list-thumbnail border-0" />
        <b-badge variant="info" pill class="position-absolute badge-top-right">{{order.category}}</b-badge>
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link tag="a" :to="{ path: 'van_management/vehicle_detail/' + order.vehicle_id }">
            <p class="list-item-heading">{{ order.category }}</p>
            <div class="pr-4">
                <p class="text-muted mb-1 text-small">{{ order.title }}</p>
            </div>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">{{ order.due_return }}</div>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    props: ['order', 'detailPath']
}
</script>
