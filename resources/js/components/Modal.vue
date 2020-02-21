<template>
    <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body">
                    <slot name="body"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="mr-1 fas fa-undo-alt"></i> Voltar</button>
                    <slot name="action"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'id',
        'title'
    ]
}
</script>